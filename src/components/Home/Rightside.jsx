import React from "react";
import BlogHeader from "../Blog/BlogHeader";
export default function Rightside(props) {
  return (
    <nav
      id="sidebarMenu"
      className="collapse d-lg-block sidebar collapse w-100 bg-transparent  "
      // style={{ width: "30rem" }}
    >
      <div className="list-group list-group-flush" style={{ padding: "6px" }}>
        <h2 style={{ textTransform: "capitalize", textAlign: "center" }} className="fs-4">
          most trend blogs{" "}
          <hr/>
        </h2>
        {props.blogRate.map((ele) => {
          return (
            <div
              className="w-100 m-0 p-0  "
              style={{

                borderRadius: "10px",
                // padding: "20px",
                // fontWeight: "bold",
                // fontSize: "1.5rem",
                fontFamily: "ui-sans-serif",
                // paddingLeft: "22px",
                // marginBottom: "28px",
                color: "#496793",
                // textDecoration: "underline",
              }}
            >
        
              <a
                href="#"
                className="list-group-item list-group-item-action ripple mt-2"
              >
                <BlogHeader
                  title={ele}
                  img={"https://picsum.photos/200/300"}
                ></BlogHeader>
                {/* <span>{ele}<  /span> */}
              </a>
            </div>
          );
        })}

        {/* <a href="#"  className="list-group-item list-group-item-action py-2 ripple">
        <span>Webiste traffic</span>
      </a>
      <a href="#" className="list-group-item list-group-item-action py-2 ripple">
        <span>Analytics</span></a>
      <a href="#" className="list-group-item list-group-item-action py-2 ripple">
        <span>SEO</span>
      </a>
      <a href="#" className="list-group-item list-group-item-action py-2 ripple">
        <span>Orders</span></a
      >
      <a href="#" className="list-group-item list-group-item-action py-2 ripple">
        <span>International</span></a
      >
      <a href="#" className="list-group-item list-group-item-action py-2 ripple"
        ><span>Partners</span></a
      >
      <a href="#" className="list-group-item list-group-item-action py-2 ripple"
        ><span>Calendar</span></a
      >
      <a href="#" className="list-group-item list-group-item-action py-2 ripple"
        ><span>Users</span></a
      >
      <a href="#" className="list-group-item list-group-item-action py-2 ripple"
        ><span>Sales</span></a
      > */}
      </div>
    </nav>
  );
}
