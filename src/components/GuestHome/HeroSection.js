import { Link } from "react-router-dom";

function HeroSection() {
    return (
        <>
            <div className="  container-fluid p-5 w-100 hero d-flex align-items-center justify-content-center text-center ">
                <div className="row">
                    <div className="col-12">
                        <div className="content content-hero">
                            <h2 className="display-3 motivation"  style={{color: "#074f57"}}></h2><br/>
                            <p className="display-6" style={{color: "#5e6d55"}}>Forget the old rules. You can have the best people Right now. Right here.</p>
                            <button type="button" style={{backgroundColor:"#074f57"}} className="btn rounded-5 mt-4 ps-5 pe-5"><Link to="/home" className="Link text-light"> Get Started </Link></button>
                        </div>

                        <div class="circle-animation  ">
                            <div class="inner-circle "></div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
};

export default HeroSection;