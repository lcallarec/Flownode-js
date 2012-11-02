<?php
namespace SwitchBoard;

use SwitchBoard\Channels;
use SwitchBoard\Response;

class SwitchBoard
{

	private static $_instance = null;

	private $channels;

    /**
     * Register a callback function to a channel
     *
     * @param string $channel Channel name
     * @param function | closure | SwitchBoardResponseInterface $callback
     */
	public function register($channel, $callback)
	{
		$this->channels[$channel] = $callback;
	}

	public static function get()
	{
		if(null == self::$_instance)
		{
			return new self();
		}

		return self::$_instance;
	}

    /**
     * Shortcut for resolving all channels from request
     *
     * @param array   $request
     * @return string
     */
	public function connect(array $request)
	{
        $response = new Response();
        foreach($request as $channel => $data)
        {
            $response->add($this->resolve($channel, $data));
        }

        return $response;
	}

    /**
     * Execute a callback for a specific channel
     *
     * @param string $channel
     * @param array  $data
     * @return array
     */
    public function resolve($channel, $data)
    {
        $callback = $this->channels[$channel];

        if($callback instanceof \Closure) {

           $response = $callback($this, $data);

        } else if (is_array($callback)) {

            $response = call_user_func_array(array($callback[0], $callback[1]), array($this, $data));

        } else {

            $response = array();

        }

        return $response;
    }

    /**
     *
     */
	private function __constuct()
	{
		$this->channels = new Channels();
	}
}
