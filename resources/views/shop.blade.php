@extends('layouts.shop')

@section('title'){{ 'Shop name' }}@endsection

@section('content')
    <div class="container">
        <v-product-list></v-product-list>
    </div>
@endsection
