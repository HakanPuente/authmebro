"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 2.1.4.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.1/ref/settings/
"""

import os

from datetime import timedelta

import environ

env = environ.Env()

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "#3q00)v1*vld$&r+o5@$i@x4a_t*6*f!qddy9o_@%x4^@u#=h9"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "graphene_django",
    "backend",
    "users",
    "graphql_jwt.refresh_token.apps.RefreshTokenConfig",
    "social_django",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",},
]

AUTH_USER_MODEL = "users.Users"

# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/

STATIC_URL = "/static/"

GRAPHENE = {
    "SCHEMA": "backend.schema.schema",
    "MIDDLEWARE": ["graphql_jwt.middleware.JSONWebTokenMiddleware",],
}

AUTHENTICATION_BACKENDS = [
    "graphql_jwt.backends.JSONWebTokenBackend",
    "django.contrib.auth.backends.ModelBackend",
    # 'django.contrib.auth.backends.AllowAllUsersModelBackend',
    "social_core.backends.github.GithubOAuth2",
    "social_core.backends.google.GoogleOAuth2",
    "social_core.backends.facebook.FacebookOAuth2",
]

GRAPHQL_JWT = {
    "JWT_VERIFY_EXPIRATION": True,
    "JWT_LONG_RUNNING_REFRESH_TOKEN": True,
    "JWT_EXPIRATION_DELTA": timedelta(minutes=60),
    "JWT_REFRESH_EXPIRATION_DELTA": timedelta(days=30),
}


EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = "ha79ak@gmail.com"
EMAIL_HOST_PASSWORD = "vkg8820167"


SOCIAL_AUTH_PIPELINE = [
    "social_core.pipeline.social_auth.social_details",
    "social_core.pipeline.social_auth.social_uid",
    "social_core.pipeline.social_auth.auth_allowed",
    "social_core.pipeline.social_auth.social_user",
    "social_core.pipeline.user.get_username",
    "social_core.pipeline.user.create_user",
    "social_core.pipeline.social_auth.associate_user",
    "social_core.pipeline.social_auth.load_extra_data",
    "social_core.pipeline.user.user_details",
]


SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = env(
    "SOCIAL_AUTH_GOOGLE_OAUTH2_KEY",
    default="654658729190-hrlqissbq9095beh94lea587kd2qd94f.apps.googleusercontent.com",
)

SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = env(
    "SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET", default="vZUWB6B-cWZ-8bvyO4tpD1f_"
)


SOCIAL_AUTH_GITHUB_OAUTH2_KEY = env(
    "SOCIAL_AUTH_GITHUB_OAUTH2_KEY", default="394270ad529be9f372ac"
)
SOCIAL_AUTH_GITHUB_OAUTH2_SECRET = env(
    "SOCIAL_AUTH_GITHUB_OAUTH2_SECRET",
    default="2fffdfa9d123eec06e29e9214ba29f330b9d8dca",
)


SOCIAL_AUTH_FACEBOOK_KEY = env("SOCIAL_AUTH_FACEBOOK_KEY", default="1568790199963835")
SOCIAL_AUTH_FACEBOOK_SECRET = env(
    "SOCIAL_AUTH_FACEBOOK_SECRET", default="baecc6438f56bd0f159d1d0ea32503c1"
)

# SOCIAL_AUTH_SPOTIFY_OAUTH2_KEY = env('SOCIAL_AUTH_SPOTIFY_KEY', default='0d22ab6a18864e089f01e710f173b4c4')
# SOCIAL_AUTH_SPOTIFY_OAUTH2_SECRET = env('SOCIAL_AUTH_SPOTIFY_SECRET', default='09c58ece9a894e3e876742167b9d2a95')

# SOCIAL_AUTH_INSTAGRAM_OAUTH2_KEY = env('SOCIAL_AUTH_INSTAGRAM_KEY', default='')
# SOCIAL_AUTH_INSTAGRAM_OAUTH2_SECRET = env('SOCIAL_AUTH_INSTAGRAM_SECRET', default='')
