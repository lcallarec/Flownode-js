<?php

namespace SwitchBoard;

require_once dirname(__FILE__) . '/../../../../../lib/SwitchBoard/Channel.php';

/**
 * Test class for Channel.
 * Generated by PHPUnit on 2012-11-02 at 22:33:48.
 */
class ChannelTest extends \PHPUnit_Framework_TestCase
{

    /**
     * @var Channel
     */
    protected $channel;

    /**
     * Sets up the fixture, for example, opens a network connection.
     * This method is called before a test is executed.
     */
    protected function setUp()
    {
        $this->name = 'name';

        $this->data = array('test' => 'ok');

        $this->channel = new Channel($this->name, $this->data);
    }

    /**
     * Tears down the fixture, for example, closes a network connection.
     * This method is called after a test is executed.
     */
    protected function tearDown()
    {

    }

    /**
     * @covers SwitchBoard\Channel::getName
     * @todo Implement testGetName().
     */
    public function testGetName()
    {
        $this->assertEquals('name', $this->channel->getName());
    }

    /**
     * @covers SwitchBoard\Channel::getData
     * @todo Implement testGetData().
     */
    public function testGetData()
    {
        $this->assertEquals($this->data, $this->channel->getData());
    }

    /**
     * @covers SwitchBoard\Channel::toArray
     * @todo Implement testToArray().
     */
    public function testToArray()
    {
        $expected = array($this->channel->getName() => $this->channel->getData());
        $this->assertEquals($expected, $this->channel->toArray());
    }

}