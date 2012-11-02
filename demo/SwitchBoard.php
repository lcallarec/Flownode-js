<?php

class SwitchBoard
{

	private static $_instance = null;

	private $channels;

	public function register($channel, $callback)
	{
		$this->channels->add($channel, $callback);
	}

	public static function create()
	{
		if(null === self::$_instance)
		{
			return new self();
		}

		return self::$_instance;
	}

	public function connect($request)
	{	
		if(is_object($request))
		{
			if(!$request instanceof SwitchBoardRequestInterface)
			{
				throw new SwitchBoardBadRequest("Unkown request type");
			}

			$response = $request->gesResponse();
		}
		elseif(is_callable($request) && isset($request[1] && is_array($request[0]))
		{
			$response = call_user_func_array($request[0], $request[1]);
		}
		elseif(function_exists(function_name))
		{
			$response = call_user_func_array($request);
		}
		else
		{
			throw new SwitchBoardBadRequest("Unkown request type");
		}

		$response = call_user_method_array($request);

		return json_encode($response);
	}

	private function __constuct()
	{
		$this->channels = new ArrayObject();
	}
}

$data = json_decode($_POST);

$closure = function() use ($data) {

	return $data;

}
