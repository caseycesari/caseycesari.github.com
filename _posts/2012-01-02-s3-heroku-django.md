---
layout: post
title: Utilizing S3 for a Heroku Django App
categories: [blog]
---

With the help of [a][1] [few][2] [articles][3], I was able to use Amazon’s [S3][4] service to host static files for a Django app hosted on [Heroku][5]. Below are the steps I followed to get this working.

Before you start, make sure your virtual environment is activated.

    {% highlight bash %}
    $ source venv/bin/activate
    {% endhighlight %}

1\. The central library we'll be using is [django-storages][6], a library for using various storage engines with Django. Documentation [here][7].

    {% highlight bash %}
    $ pip install django-storages
    {% endhighlight %}

2\. You'll also need [boto][8], a dependency for django-storages. Boto is a Python library for interfacing with Amazon Web Services.

    {% highlight bash %}
    $ pip install boto
    {% endhighlight %}

3\. In your settings.py, add `'storages'` to your list of `INSTALLED_APPS`.

4\. Add the following line to your `settings.py`:

    {% highlight python %}
    STATICFILES_STORAGE = 'storages.backends.s3boto.S3BotoStorage'
    {% endhighlight %}

This allows `django-admin.py collectstatic` to upload your static files to your S3 bucket.

5\. Add Amazon Web Service parameters to `settings.py`. Keep in mind that if you are using a public repo on github, all of these parameters are exposed. Also, boto doesn't like a bucket name with capital letters, so make sure you are using a bucket with an all lower-case name.

    {% highlight python %}
    AWS_ACCESS_KEY_ID = 'XXXXXXXXXXXXXXXXXXX'
    AWS_SECRET_ACCESS_KEY = 'xxXXXxxXxxXxXXXxxXxXxxXXXXxxXxX'
    AWS_STORAGE_BUCKET_NAME = 'bucket name'
    {% endhighlight %}

6\. In settings.py change your `STATIC_URL` to point to your S3 URL.

    {% highlight python %}
    STATIC_URL = 'https://s3.amazonaws.com/bucket-name/'
    {% endhighlight %}

If you are using the built-in Django admin app, also update `ADMIN_MEDIA_PREFIX`:

    {% highlight python %}
    ADMIN_MEDIA_PREFIX = STATIC_URL + 'admin/'
    {% endhighlight %}

7\. Run `manage.py collectstatic`. This should copy your static files to your S3 bucket.

8\. Check your app locally. Your static files should now be served from S3. Once you verify that is everything is working, update your app requirements:

    {% highlight bash %}
    $ pip freeze > requirements.txt
    {% endhighlight %}

9\. If you don't have one already, create a `.slugignore` file in the root of your repo. This file is simliar to a `.gitignore` file, except files and folders are still tracked in the repo but are not compiled as part of your app on Heroku. Add the following line to the `.slugignore` file to ignore the static directory:
    
    {% highlight bash %}
    static
    {% endhighlight %}

Now your static files are being served from S3 and your Heroku slug size is smaller; which, [according][2] to Heroku, allows for better app performance.

[1]: https://docs.djangoproject.com/en/dev/howto/static-files/
[2]: http://devcenter.heroku.com/articles/slug-compiler
[3]: http://iknuth.com/2011/10/deploying-a-django-app-to-heroku-with-easy-static-files-on-s3/
[4]: http://aws.amazon.com/s3/
[5]: http://www.heroku.com
[6]: http://code.welldev.org/django-storages/
[7]: http://django-storages.readthedocs.org/
[8]: http://code.google.com/p/boto/