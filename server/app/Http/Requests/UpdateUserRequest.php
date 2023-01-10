<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "username" => ["nullable", "min:3", "max:55", "unique:users,username"],
            "firstname" => ["nullable", "min:3", "max:55"],
            "lastname" => ["nullable", "min:3", "max:55"],
            "email" => ["nullable", "email", "unique:users,email"],
            "password" => ["nullable", "min:8", "confirmed"],
            "bio" => ["nullable", "min:3", "max:255"],
            "role_id" => ["nullable", "exists:roles,id"],
            "points" => ["nullable", "number"]
        ];
    }
}
