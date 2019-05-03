<?php

use Illuminate\Database\Seeder;

class QuestionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        // Load questions from data.json file
        $path = base_path() . '/database/data.json';
        $file = File::get($path);

        $data = json_decode($file, true);
       
        DB::table('questions')->insert($data);
    }
}
