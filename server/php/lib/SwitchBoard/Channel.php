<?php
namespace SwitchBoard;

/**
 * Channel management
 *
 */
class Channel
{
    /**
     * Channel name
     *
     * @var string
     */
    protected $name;

    /**
     * Channel holds by this channel
     *
     * @var array
     */
    protected $data;

    /**
     *
     * @param string $name
     * @param array  $data
     */
    public function __construct($name, array $data = array())
    {
        $this->name = $name;

        $this->data = $data;
    }

    /**
     * Get channel name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Get data bound to this channel
     *
     * @return array
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * Return an array represntation of this channel
     *
     * @return array
     */
    public function toArray()
    {
        return array('channel' => $this->name, 'data' => $this->data);
    }

}
