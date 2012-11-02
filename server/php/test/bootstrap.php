<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * @author lcallarec
 */
// TODO: check include path
ini_set('include_path', ini_get('include_path').PATH_SEPARATOR.dirname(__FILE__).'/../../../../../xampp/php/PEAR/PHPUnit');

// put your code here
use Symfony\Component\ClassLoader\UniversalClassLoader;
require_once dirname(__FILE__).'/../ext/Symfony2/Component/ClassLoader/UniversalClassLoader.php';

$loader = new UniversalClassLoader();

$loader->registerNamespaces(array(
       'Symfony'     => __DIR__.'/../ext/Symfony2',
       'SwitchBoard' => __DIR__.'/..//lib'
));

$loader->register();
?>
