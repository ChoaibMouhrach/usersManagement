<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $table = "roles";

    public $fillable = [
        "name",
    ];

    public function users()
    {
        return $this->hasMany(User::class, "role_id", "id");
    }

    public function latestUser()
    {
        return $this->hasOne(User::class)->latestOfMany();
    }

    public function firstUser()
    {
        return $this->hasOne(User::class)->oldestOfMany();
    }

    public function richest_person()
    {
        return $this->hasOne(User::class)->ofMany("points", "max");
    }

    public function poorest_person()
    {
        return $this->hasOne(User::class)->ofMany("points", "min");
    }
}
