## Prerequisites
<ul>
<li>After cloning this repository, go to the root folder, run the following command/s,
<pre>
    composer install
    composer update</pre>
</li>
<li>Rename .env.example to .env and provide your database details there.</li>
<li>It needs a database table to perform CRUD operations on it. Run <code>php artisan migrate</code> to import the table.</li>
<li>Run <code>php artisan db:seed</code> to create data seeding.</li>
<li>Run <code>php artisan key:generate</code> </li>
<li>Run <code>php artisan serve</code></li>
<li>Access <code>http://localhost:8000</code></li>

</ul>
