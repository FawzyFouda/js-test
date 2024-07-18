 // نص الجملة التي سيتم كتابتها
 var text = "قريباً... تجربة جديدة ومثيرة في عالم التسويق العقارى. لا تفوتوا!";

 // مدة التأخير بين حرف وآخر في الـ typing animation (بالملي ثانية)
 var speed = 50;

 var i = 0;
 function typeWriter() {
     if (i < text.length) {
         document.getElementById("title").innerHTML += text.charAt(i);
         i++;
         setTimeout(typeWriter, speed);
     }
 }

 // ابدأ الـ typing animation
 setTimeout(typeWriter, 6300); // تأخير البداية بعد ثانية واحدة

//  _____________________
        // Set the date we're counting down to
        var countDownDate = new Date("oct 30, 2024 00:00:00").getTime();

        // Update the countdown every 1 second
        var x = setInterval(function() {

            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the corresponding elements
            document.getElementById("days").textContent = days;
            document.getElementById("hours").textContent = hours;
            document.getElementById("minutes").textContent = minutes;
            document.getElementById("seconds").textContent = seconds;


            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("countdown").innerHTML = "EXPIRED";
            }
        }, 1000);