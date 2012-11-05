<?php
/**
 * @author lcallarec
 */
// put your code here
use Symfony\Component\ClassLoader\UniversalClassLoader;
require_once dirname(__FILE__).'/../vendor/Symfony2/Component/ClassLoader/UniversalClassLoader.php';

$loader = new UniversalClassLoader();

$loader->registerNamespaces(array(
       'Symfony'     => __DIR__.'/../ext/Symfony2',
       'SwitchBoard' => __DIR__.'/../lib'
));

$loader->register();

