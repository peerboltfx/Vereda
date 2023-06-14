<?php
namespace app\SmsChannel;
use Illuminate\Notifications\Notification;

class SmsChannel
{
    /**
     * Send the given notification.
     * 
     * @param mixed $notifiable.
     * @param \Illuminate\Notification\Notification $notification
     * @return void
     */

     public function send($notifiable, Notification $notification){
        $message = $notification->toSms($notifiable);

        $message->send();

     }
}

