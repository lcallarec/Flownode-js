<?php
namespace SwitchBoard;

use SwitchBoard\Channels;
use SwitchBoard\Channel;

/**
 * Response send back to the client
 *
 */
class Response
{
    /**
     * Collection of channels to sendback to the client
     *
     * @var \SwitchBoard\Channel
     */
	protected $channels;

    /**
     *
     */
    public function __construct()
	{
       $this->channels = new Channels();
	}

    /**
     * Add a channel to the response
     *
     * @param \SwitchBoard\Channel $channel
     * @return \SwitchBoard\Response
     */
    public function add(Channel $channel)
    {
        $this->channels->append($channel);

        return $this;
    }

    /**
     * Get the JSON representation of this response
     *
     * @param array    $response
     * @return string
     */
    public function toJSON($jsonOption = 0)
    {

        return $this->channels->toJSON($jsonOption);
    }

}
