<?php
namespace SwitchBoard;

use SwitchBoard\Common\Collection;

/**
 *  Channel collection
 */
class Channels extends Collection
{
    /**
     * JSON representation of all channels
     *
     * @param int json_encode option
     * @return string
     */
    public function toJSON($jsonOption = 0)
    {
        $array = array();
        foreach($this->getData() as $channel) {

            $array['channels'][] = $channel->toArray();

        }

        return json_encode($array, $jsonOption);

    }
}
