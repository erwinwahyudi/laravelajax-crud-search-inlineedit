<?php

use Illuminate\Database\Seeder;
use App\Item;

class ItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        for($i=0; $i<=1000; $i++) {
            Item::create([
                'name'  => $faker->city,
                'price' => $faker->randomNumber(6),
                'total' => $faker->randomNumber(2),

            ]);
        }
    }
}
