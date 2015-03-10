<section class="home__about">
  <h3>About</h3>

  {% include '../../../articles/about/about.html.swig' %}

  {% set button = about.button %}
  {% include '../../../../../design/decorations/button/button.html.swig' %}
</section>
