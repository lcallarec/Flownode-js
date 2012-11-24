<?php
ini_set('error_reporting', E_ALL);
use SwitchBoard\SwitchBoard;
use SwitchBoard\Channel;
use SwitchBoard\Response;

require_once dirname(__FILE__).'/../vendor/autoload.php';

$data = array('open.remote.modal.closure'  => array('erk' => 'blue'),
              'open.remote.modal.function' => array('erk' => 'blue'),
              'open.remote.modal.static'   => array('erk' => 'blue'),
              'open.remote.modal.instance' => array('erk' => 'blue'));

$sb = SwitchBoard::get();

$ext = 1;



$closure =  function($response, $data) use ($ext) {

  $d['test'] = 5;
  return  new Channel('open.remote.modal.closure', $d);

};

$sb->register('open.remote.modal.closure', $closure);


$function =  function($response, $data) {
  $d['test'] = 6;
  return  new Channel('open.remote.modal.function', $d);
};

$sb->register('open.remote.modal.function', $function);

class MyClass
{
    static public function staticMethod($response, $data)
    {
        $d['test'] = 7;
        return new Channel('open.remote.modal.static', $d);
    }

    public function instanceMethod($response, $data)
    {
        $d['test'] = 8;
        return new Channel('open.remote.modal.instance', $d);
    }
}

new Response();

$myClass = new MyClass();

$sb->register('open.remote.modal.static', array('MyClass', 'staticMethod'));
$sb->register('open.remote.modal.instance', array($myClass, 'instanceMethod'));

$sb->register('open_test', function($response, $data){ return new Channel('alert', array('message' => 'couycou'));});

$response = $sb->connect($_POST);

echo $response->toJSON();



