<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function profile()
    {

        /** @var \App\Models\User $user */
        $user = auth("sanctum")->user();

        $user->refresh();

        return $user;
    }

    // authentication
    public function auth(LoginRequest $request)
    {
        $validated = $request->validated();

        /** @var \App\Models\User $user */
        $user = User::where("email", $validated["email"])->first();

        if (Hash::check($validated["password"], $user->password)) {
            $token = $user->createToken("authToken")->plainTextToken;

            return response([
                "user" => $user,
                "token" => $token
            ], 200);
        }

        return response([
            "message" => "Login credentials are not correct"
        ], 400);
    }

    // registration
    public function register(RegisterRequest $request)
    {
        $validated = $request->validated();

        /** @var \App\Models\User $user */
        $user = User::create([
            "username" => $validated["username"],
            "firstname" => $validated["firstname"],
            "lastname" => $validated["lastname"],
            "email" => $validated["email"],
            "password" => bcrypt($validated["password"])
        ]);

        /** @var string $token */
        $token = $user->createToken("authToken")->plainTextToken;

        return response([
            "user" => $user,
            "token" => $token
        ], 201);
    }

    // logout
    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::guard("sanctum")->user();

        $user->currentAccessToken()->delete();

        return response("", 204);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $users = User::with("role:id,name");

        if ($request->input("search")) {
            $search = $request->input("search");
            $users = $users->where("username", $search)->orWhere("firstname", $search)->orWhere("lastname", $search)->orWhereHas("role", function (Builder $query) use ($search) {
                $query->where("name", "like", "%$search%");
            });
        }

        if ($request->input("direc") && ($request->input("direc") === "desc" || $request->input("direc") === "inc")) {
            if ($request->input("field")) {
                $users = $users->orderby($request->input("field"), $request->input("direc"));
            } else {
                $users = $users->orderby("id", $request->input("direc"));
            }
        }

        return $users->paginate(8);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $validated = $request->validated();

        $validated["password"] = encrypt($validated["password"]);

        $user = User::create($validated);

        $user->refresh();

        return $user;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);
        $user->load("role:id,name");
        return $user;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, $id)
    {
        $validated = $request->validated();

        $user = User::find($id);

        $user->update($validated);

        return $user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $user = User::find($id);
            $user->delete();
            return  response("", 204);
        } catch (\Exception $err) {
            return response([
                "message" => "operation failed"
            ], 400);
        }
    }
}
