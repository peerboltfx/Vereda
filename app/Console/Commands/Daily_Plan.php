<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class Daily_Plan extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:name';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        return  auth()->user()->daily_plan()->delete()->everyMinute();
        echo "Transaction timed out";
    }
}
