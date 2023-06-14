<!DOCTYPE html>
<html>
<head>
    <title>{{ $dev}}</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>    
    <script src="../src/purify.js"></script>
</head>
<body>
<div class="container">
    <style>
        .loading{
            position:absolute;
            width:100%;
            height:100%;
        }
        button{
            height:70px;
            border-radius:50px;
            background:black;
            width:200px;
            color:white
        }
        .razorpay-payment-button{
            height:70px;
            border-radius:50px;
            background:black;
            width:200px;
            color:white
       
        }
    </style>
    <div class="row">
        <div class="col-md-12">
            @if($message = Session::get('error'))
                <div class="alert alert-danger alert-dismissible fade in" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                    <strong>Error!</strong> {{ $message }}
                </div>
            @endif
           
            {!! Session::forget('success') !!}
            <div class="panel panel-default" style="margin-top: 30px;">
                <h3  class="text-center">{{ $dev}}</h3><br>
                <div class="panel-heading">
                    <h2 class="text-center">Pay With Razorpay</h2>
                    <form action="/razorpaypayment" method="post">
                    @csrf
                    <input type="text" value="Amin" name="name" />
                    <input type="text" name="payment_id" value="cash" id="">
                    <input type="text" name="program" value="{{ $dev}}" id="">
                    <input type="text" name="razorpay_payment_id" value="40" id="">
                        <button>submit</button>
                    </form>
                    <div id="demo"></div>
                    <script>
                      'use strict';
                      
                        let clean = DOMpurify.sanitize('{{$hint}}');
                        document.getElementById("demo").innerHTML=clean;
                    </script>
                    <!-- <div class="panel-body text-center"> -->
                    <form action="{!!route('payment')!!}"  onsubmit="onLoad()" method="POST" >                        
                        <script src="https://checkout.razorpay.com/v1/checkout.js"
                                data-key="{{ env('RAYZOR_TEST_KEY') }}"
                                data-amount="{{ $price }}"
                                data-buttontext="Pay {{ $price }} INR"
                                data-name="Websolutionstuff"
                                data-description="Payment"
                                data-image="https://websolutionstuff.com/frontTheme/assets/images/logo.png"
                                data-prefill.name="name"
                                data-prefill.email="email"
                                data-theme.color="#ff7529">
                        </script>
                        <input type="hidden" name="_token" value="{!!csrf_token()!!}">
                    </form>
                  
                </div>
            </div>
        </div>
    </div>
</div>
</body>

</html>