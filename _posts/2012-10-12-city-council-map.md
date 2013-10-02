---
layout: post
title: 2016 City Council Districts Map
categories: [blog]
---

This week, the City of Philadelphia Office of Innovation and Technology released the new City Council districts boundaries [shapefile](http://www.opendataphilly.org/opendata/resource/209/city-council-districts-2016/). The city charter mandates that within six months of new census data being released, City Council has to redraw the district boundaries to account for shifts in population (each district should contain roughly the same number of people). You might remember that Council [nearly missed](http://www.newsworks.org/index.php/local/philadelphia/26984-philadelphia-city-council-settles-on-redistricting-plan) their deadline. In the end, they were able to come up with new boundaries based off 2010 census data, but kept the existing boundaries [active until 2016](http://legislation.phila.gov/attachments/12376.pdf). 

I made a quick [interactive map](/projects/council-map) to show how these new boundaries compare to the current boundaries. The goal of the map is to allow users, with a simple click or hover, to find out which current and future district a certain area falls within.

The tricky part was figuring out a way to get the district information from both the 2000 and 2016 layers no matter which districts layers were turned on or which layer was on top of the other. I used [Leaflet](http://leaflet.cloudmade.com), which doesn't propagate events through each active layer, nor does it have a point in polygon function (point in bounding box doesn't quite work with irregular shapes). I also wanted to give the user district information even when both the 2000 and 2016 layers were turned off.

The solution was to create a transparent layer that contained information for both district layers. The first step in creating this layer is to intersect the 2000 and 2016 layers. I used [QGIS](http://qgis.org/)'s vector intersect function to do this. Here is the output:

![Council District Intersect](/assets/img/council-district-intersect.png)

Basically, for each area where polygons from both layers overlap, a new polygon is created which contains the attributes from both layers. The ArcMap documentation has a [simple graphic](http://webhelp.esri.com/arcgisdesktop/9.2/published_images/intersect_esri.gif) showing how this function works.

Once I had the resulting shapefile, I needed to convert it to GeoJSON format--which are [quite easy](http://leaflet.cloudmade.com/examples/geojson.html) to add to a Leaflet map. A quick and painless way to do this is with the [ogr2ogr](http://www.gdal.org/ogr2ogr.html) command line tool that is part of ever-helpful [Geospatial Data Abstraction Library](http://www.gdal.org/). Here we convert the shapefile to the [WGS 84 map projection](http://spatialreference.org/ref/epsg/4326/) from state plane, and only include the fields we need for the map:

    {% highlight bash %}
    $ ogr2ogr -f GeoJSON -t_srs EPSG:4326 -select dist_2000, dist_2016 intersect.json intersect.shp
    {% endhighlight %}

This layer is then added on top of the other layers, but all the color attributes are set to `transparent`. When a user clicks or hovers over the map, they are actually hovering over the intersect layer. In leaflet (and in SVG graphics in general), elements that are drawn last are put on top of existing elements. To make sure the transparent layer is always on top of the other layers, we push it to the front if a user clicks or hovers over one of the other visible layers. The transparent layer is added to a [FeatureGroup](http://leaflet.cloudmade.com/reference.html#featuregroup), which has a handy `bringToFront()` method. Here is a simplified version of the code:

    {% highlight javascript %}
    2000_districts = new L.geoJson(2000_districts_geojson, { 
      onEachFeature: function (feature, layer) {
        layer.on({
          mouseover: function(){
            transparent_layer.bringToFront();
          },
          click: function() {
            transparent_layer.bringToFront();
          }
        })
      }
    });
    {% endhighlight %}

The same code is applied to the 2016 layer. Now if either of the visible layers are turned off and on (which puts it on top of all the other layers), when the user clicks or hovers over the map, the transparent layer is pushed to the front, and the district information is updated on the page. Both visible layers can also be turned off, and the user will still get district information for the area of the city they click on.

The downside to this method is that there an additional, more complex layer on the map. Even though you can't see the transparent layer, it still takes resources to load and draw. A faster solution would be to render map tiles using [TileMill](http://mapbox.com/tilemill/) using the same transparent, intersect layer technique. However, once I exported the transparent tiles, the interaction I set up was lost. Given this, I think the transparent vector layer approach is a good way to solve overlapping layer interactivity.