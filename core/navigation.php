<?php

  $_SE = new SearchEngine;
  $pagename = $_SE -> NameValidation($_SE -> PostChecker('pagename'));
  $pagepath = $_SE -> PageValidation($pagename);
  $pagelist = $_SE -> PageList("page/");

 ?>
