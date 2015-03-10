---
title: Home
---


{% extends "../../templates/default.html.swig" %}
{% block content %}

  {% set about = home.about %}
  {% include '../../elements/sections/home/about/home__about.html.swig' %}

  {% set values = home.values %}
  {% include '../../elements/sections/home/values/home__values.html.swig' %}

{% endblock %}
