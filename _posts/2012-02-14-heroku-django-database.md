---
layout: post
title: Managing a Django Database on Heroku
categories: [blog]
---
Whether you are using Heroku's database offerings in development or production, you'll most likely need to push data and make changes to table schemas. I used these methods in the context of managing a database for a Django app, but they should work for apps built on other frameworks as well.

Initially, I followed the method laid out [here][1], but I didn’t like having to add and remove the data from the repo.

Heroku recommends using a ruby gem called [Taps][2] to manage your data. Even though Taps is a ruby library, it works just fine with Django since its just interacting with your local database of choice and doesn’t much care about what the database is used for.

Heroku put together a good [article][3] on using Taps. Given that the Heroku walk through is pretty comprehensive, you should read that first before reading the rest of this post. This article is meant to summarize my experiences and act as a Django supplement to the Heroku article. Also, this [article][4] was particularly helpful through-out this whole process. I recommend giving it a read before getting started.

To use Taps, you’ll need ruby on your local machine. You’ll also need to install the appropriate database gem for Ruby:

Mysql

	{% highlight bash %}
    $ gem install mysql
    {% endhighlight %}

Postgres

	{% highlight bash %}
    $ gem install pg
    {% endhighlight %}

Also, since there is no .yml for a Django project, you'll need to use the database URL parameters for all of the Taps commands or create a .yml file. For my project, I was using Postgres, so I'll use those for the examples. The mysql database URL structure is a little different. See the Heroku Taps [article][3] for an example.

#### Push local database to Heroku

This will overwrite your database on Heroku. Adding the confirm parameter will skip the confirmation from Heroku. If you want to play it safe and make this a two-step process, leave it off.

	{% highlight bash %}
    $ heroku db:push postgres://user:pass@localhost/database_name --confirm your-heroku-app-name-here
    {% endhighlight %}

#### Backing up Heroku database

First, create a local database to store the backup tables in:
  
  	{% highlight bash %}
    $ createdb backup_database_name
    {% endhighlight %}

Then, run:

	{% highlight bash %}
    $ heroku db:pull postgres://user:pass@localhost/backup_database_name
    {% endhighlight %}

#### Modifying the schema of the Heroku database

I highly recommend using [South][5] for database migrations in Django. With South, you'll be able to make and keep track of changes to all of your app's models pretty easily. Follow this [tutorial][6] to get started.

Once you have South up and running locally, you can update the Heroku database schemas just like you would on your local machine. Make sure the South migration files are being tracked in your git repo so that they get pushed to Heroku. Then run `syncdb` on Heroku to add the necessary South tables to your remote database. Now you can run migrations on Heroku just like you would locally. For example:

	{% highlight bash %}
    $ heroku run python project_name/manage.py migrate app_name
    {% endhighlight %}

#### Use a remote database for your Heroku app

When you are ready to move your database off Heroku (I think you can find a better deal on a cloud database than using the Heroku options), you'll need to modify your settings.py to point to a remote server. After getting your remote DB up and running, run this command

	{% highlight bash %}
    $ heroku config:add DATABASE_URL= your_database_url
    {% endhighlight %}

If you don't have this line in your settings.py, Heroku adds this line automatically and points it at it's own servers. Adding this line yourself allows you to specify which database Heroku should look to for your app.

[1]: http://rockycode.com/blog/django-loaddata-heroku/
[2]: http://rubygems.org/gems/taps
[3]: http://devcenter.heroku.com/articles/taps
[4]: http://www.askthepony.com/blog/2011/07/getting-django-on-heroku-prancing-8-times-faster/
[5]: http://south.aeracode.org/
[6]: http://south.aeracode.org/docs/tutorial/index.html]