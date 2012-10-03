---
layout: post
title: A Second Try for City Lobbying Site
categories: [blog]
---

Last week, the City of Philadelphia put out a Request For Proposals (RFP) soliciting bids to build the [Board of Ethic](http://www.phila.gov/ethicsboard/lobbying.html)'s lobbying registration and public disclosure website. 
This will be the City's second attempt at the project. Earlier this year, the City [paid $227,000 to the consulting firm Perficient, Inc. before totally scrapping their effort](http://www.newsworks.org/index.php/off-mic/item/38216).

After a small struggle to access the [RFP document](https://secure.phila.gov/ECONTRACT/Documents/frmPDFWindow.aspx?docid=211209241237530211209251056121N&ext=pdf) (the [eContract](https://secure.phila.gov/ECONTRACT/) site is built to only support Internet Explorer and is in desperate need of an upgrade, speaking of RFPs), I gave it a quick read. The Board appears to be on the right track to get a modern website that citizens have come to expect -- although open data advocates may not be completely satisfied.

First, the City wants the lobbying data to be easily accessible. Laid out in the project requirements, the RFP states:

> Provide citizens with the ability to search for and download Lobbying 
> registration and expense report information easily via the internet and to 
> generate a PDF of each registration or expense report or amended registration 
> or expense report. 

And in Appendix A, under the detailed project requirements:

> Must allow members of the public to query the PLIS database and build customizable 
> searches from all data fields. The system must allow all users to download and export 
> data, and also to print and save search results

Public search and access to the data is a good thing, and is in fact, in this case, required by [law](http://www.amlegal.com/nxt/gateway.dll/Pennsylvania/philadelphia_pa/title20officersandemployees/chapter20-1200lobbying?f=templates$fn=default.htm$3.0$vid=amlegal:philadelphia_pa$anc=JD_20-1206). More on this later.

In addition to mentioning that the application should be “state of the art”, the RFP states that the City prefers a cloud-hosted solution over a traditional local install on the City's own infrastructure: 

> The City prefers a solution hosted in a cloud/(SaaS, IaaS, PaaS) environment where vendor 
> is responsible for establishing and maintaining the software, infrastructure and/or 
> platform within defined service levels and consumption-based economics.  An on-premise 
> private or hybrid cloud solution in the City's data center option would be considered, as well. 

Hosting the website in the cloud has the potential to take a huge workload off OIT. They won't have to perform hardware and software updates and can hold the contractor to a certain performance standard. Even without taking into account the other potential benefits of the cloud (scalability, speed, colocation, etc), this is a smart decision considering that the City has plenty of legacy applications to maintain.

There's also an ambitious schedule for the project:

> The City seeks a solution that
> can be designed and implemented in a four-month timeframe

The schedule laid out in the RFP has the project starting on January 2nd of next year, which, with a 4-month development schedule, would make the second quarter of 2013 the first quarter that expenditure reports could be filed online. I think this is possible with a cloud-hosted solution, even if it's a custom built application. But I have doubts that it could be rolled out in time if it's going to be installed on the City's own infrastructure -- from personal experience (I worked at the Philadelphia Water Department for 5 years) just that process can take longer than 4 months.

Also, expect headshots of your favorite lobbyists:

> Provide an on-line directory of Lobbyists with standardized photos;

It's clear the public will have some level of access to the lobbying data. But it is not clear whether or not access will be supplemented by an API. An API is important because it allows for direct, often real-time, integration of data into other applications. 

Mark Headd, a civic hacker, [open data advocate](http://civic.io/2012/09/12/3-reasons-to-care-about-open-data/) and the City's [first Chief Data Officer](http://technicallyphilly.com/2012/08/13/mark-headd-first-ever-city-of-philadelphia-chief-digital-officer), wasn't involved in putting the RFP together, but thinks an API "would be sweet.” Board of Ethics staff was unable to answer questions outside of the RFP pre-proposal meeting; which is taking place on October 9th, at 10am on the 16th Floor of the Municipal Services Building.

[Lobbying.ph](http://lobbying.ph), a project of the [Philadelphia Public Interest Information Network](http://www.ppiin.org) that I built and maintain, could benefit from a lobbying data API -- but the larger point is that every new data-driven city web application should include an API. The City should also make sure contractors meet certain standards when implementing those APIs. When asked if the City would look to include API best practices in it's [OIT Web and Creative Services Standards Guide](https://secure.phila.gov/ECONTRACT/Documents/frmPDFWindow.aspx?docid=211209241237530211209241632401N&ext=pdf), a document that accompanies technology RFPs and sets the baseline for City websites, Headd replied "Yes, I most definitely see us developing some standards for deploying and documenting APIs."

The City has a string of somewhat successful technology projects including the recent roll out of [Phila.gov/Map](http://www.phila.gov/map) (featuring much sought-after L&I data, an API [is on the way](http://planphilly.com/li-releases-new-apps-website-upgrade)) and the [311 mobile app](http://www.phila.gov/311/mobileapp.html). Requiring a searchable site with downloadable data, and preferring a cloud-based solution are some good indications the City wants to continue that streak with the Lobbying website. I'm crossing my fingers for an API.

*If you are using a Mac, or refuse to use Internet Explorer, you can [access a contract](https://secure.phila.gov/eContract/) by pasting the contract number in the unlabeled field in the top right of the New Contract Opportunities page and then pressing enter. This will take you to the page with working links to the RFP documents.*