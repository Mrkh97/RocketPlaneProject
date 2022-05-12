export default function CalculateRatio() {



    let deltaT = 0.05;
    let planeSpeed;
    let rocketSpeed;

    let XPlane = 0;
    let YPlane = 100;


    let XRocket = 0;
    let YRocket = 0;

    let ratio = [];

    function CalculateDistance(planeV, rocketV) {
        XPlane = 0;
        YPlane = 100;
        XRocket = 0;
        YRocket = 0;
        while (XPlane < 100) {

            XPlane = XPlane + (planeV * deltaT);
            XRocket = XRocket + (rocketV * deltaT * ((XPlane - XRocket) / (Math.sqrt(((XPlane - XRocket) ** 2) + ((YPlane - YRocket) ** 2)))));
            YRocket = YRocket + (rocketV * deltaT * ((YPlane - YRocket) / (Math.sqrt(((XPlane - XRocket) ** 2) + ((YPlane - YRocket) ** 2)))));
            // console.log((Math.sqrt(((XPlane - XRocket) ** 2) + ((YPlane - YRocket) ** 2))));
            if ((Math.sqrt(((XPlane - XRocket) ** 2) + ((YPlane - YRocket) ** 2))) < 0.1) {

                return true;
            }

        }
        return false;
    }




    for (rocketSpeed = 1; rocketSpeed <= 20; rocketSpeed++) {
        for (planeSpeed = 1; planeSpeed <= rocketSpeed; planeSpeed++) {
            if (CalculateDistance(planeSpeed, rocketSpeed)) {
                ratio.push(rocketSpeed / planeSpeed);
            }

        }

    }

    console.log(ratio);

    return <div>
        hi
    </div>
}