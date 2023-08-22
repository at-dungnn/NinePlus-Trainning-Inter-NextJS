import React, { useEffect, useRef, useState } from "react";
import AppConfig from "@/layout/AppConfig";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { LayoutContext } from "@/layout/context/LayoutContext";
import { NodeRef, Page } from "@/types/types";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { ServicesManageService } from "@/shared/services/BookingService";
import { useRouter } from "next/router";
import { Avatar } from "primereact/avatar";
import { TieredMenu } from "primereact/tieredmenu";

// const fetchService = () => {
//     const serviceFetch = new ServicesManageService();
//     return serviceFetch.getServices("");
// };
const fakedata = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6InN1cGVyYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJsZWhpZXUucXJ0QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJOZ3V5ZW4gUGh1b2MgTGUgSGlldSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJhZG1pbiIsImV4cCI6MTY5Mjg2MTE2NX0.DgrXfah_yclmcu2qXNIR6-7oooM95IaDLD8mGUJOKJM",
    refreshToken: "sx6d63MKUlya8dPHGv56YWGUH60wP51SDKcNwRFy9c4=",
    employeeNo: "superadmin",
    email: "lehieu.qrt@gmail.com",
    avatarUrl:
        "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png",
    role: "Superadmin",
    refreshTokenExpiryTime: "2023-08-29T14:12:45.0946093+07:00",
    userId: 0,
};
const LandingPage: Page = () => {
    const router = useRouter();
    const [user, setUser] = useState<any>();
    const [service, setService] = useState();
    const [isLogin, setLogin] = useState(false);
    const [contact, setContact] = useState<any>({});
    const aboutMenu = useRef(null);
    const serviceMenu = useRef(null);
    const profileMenu = useRef(null);
    const productMenu = useRef(null);
    const mobileMenu = useRef(null);
    useEffect(() => {
        setUser(localStorage.getItem("USER") || null);
    }, []);

    const aboutOption = [
        {
            label: "About us",
            url: "/about",
        },
        { label: "Vision, Misson, Core Values" },
        { label: "About the president" },
        {
            label: "Team of Doctors",
        },
        { label: "Achievement" },
    ];
    const serviceOption = [
        {
            label: "Skin care Treatment",
            url: "https://primereact.org/menu/",
        },
        {
            label: "Body treatment",
        },
        {
            label: "Facial treatment",
        },
        { label: "Hair care" },
        {
            label: "Nail",
        },
    ];
    const productOption = [
        { label: "Cosmetics" },
        {
            label: "Health protection product",
        },
        {
            label: "Hair care",
        },
    ];
    const serviceCarousel = [
        {
            src: "https://img.freepik.com/free-photo/beauty-spa_144627-46202.jpg?t=st=1692011876~exp=1692012476~hmac=1f66c01793fd5f788c46036beb3e7a265f843d5df8dd927406be47959bc0380c",
        },
        {
            src: "https://img.freepik.com/free-photo/beautiful-young-woman-having-spa-massage-head-beauty-salon-indoors_186202-3543.jpg?t=st=1692012001~exp=1692012601~hmac=092fdb099c572c5a44d6157d059e42985b91db91813165755d3191919dbde8f7",
        },
        {
            src: "https://img.freepik.com/free-photo/beautician-with-brush-applies-white-moisturizing-mask-face-young-girl-client-spa-beauty-salon_343596-4246.jpg?t=st=1692012029~exp=1692012629~hmac=4c7915b5beea4d517a691628b89c7f2b29902fbb7a4998de3c49fe7337dbdea8",
        },
    ];
    const profileOption = [
        { label: "Profile", visible: user !== null },
        { label: "Settings", visible: user !== null },
        { label: "Manage", visible: user !== null },
        { label: "Profile", visible: user !== null },
        { label: "Log In", visible: user === null },
        { label: "Sign Up", visible: user === null },
        {
            separator: true,
            visible: user !== null,
        },
        {
            label: "Log Out",
            command: () => {
                localStorage.removeItem("USER");
                router.reload();
            },
            visible: user !== null,
        },
    ];
    const MobileOption = [
        {
            label: "About us",
            items: [...aboutOption],
        },
        {
            label: "Services",
            items: [...serviceOption],
        },
        {
            label: "Product",
            items: [...productOption],
        },
        {
            label: "Blog",
        },
        {
            separator: true,
        },
        { label: "Profile", items: [...profileOption] },
    ];
    return (
        <>
            <div className="container-fluid p-0">
                <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0 px-lg-5">
                    <a href="index.html" className="navbar-brand ml-lg-3">
                        <h1 className="m-0 primary-text">
                            <span className="text-dark">NATURAL</span> SPA
                        </h1>
                    </a>
                    <button
                        type="button"
                        className="navbar-toggler"
                        data-toggle="collapse"
                        data-target="#navbarCollapse"
                        onClick={(event) => {
                            (mobileMenu.current as any).toggle(event);
                        }}
                    >
                        <TieredMenu
                            model={MobileOption as any}
                            popup
                            ref={mobileMenu}
                            breakpoint="767px"
                        />
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse justify-content-between gap-8 px-lg-3"
                        id="navbarCollapse"
                    >
                        <div className="navbar-nav py-0">
                            <Button
                                severity="secondary"
                                label="About us"
                                onClick={(event) =>
                                    (aboutMenu.current as any).toggle(event)
                                }
                                aria-haspopup
                                text
                            />
                            <Menu
                                ref={aboutMenu}
                                popup
                                model={aboutOption}
                                className="mt-3"
                            />

                            <Button
                                severity="secondary"
                                label="Service"
                                onClick={(event) =>
                                    (serviceMenu.current as any).toggle(event)
                                }
                                aria-haspopup
                                text
                            />
                            <Menu
                                ref={serviceMenu}
                                popup
                                model={serviceOption}
                                id="servicePopup"
                                className="mt-3"
                            />
                            <Button
                                severity="secondary"
                                label="Product"
                                onClick={(event) =>
                                    (productMenu.current as any).toggle(event)
                                }
                                aria-haspopup
                                text
                            />
                            <Menu
                                ref={productMenu}
                                popup
                                model={productOption}
                                id="productPopup"
                                className="mt-3"
                            />

                            <Button severity="secondary" label="Blog" text />
                        </div>

                        {user === null ? (
                            <div className="flex gap-8 w-24rem ">
                                <Button
                                    severity="success"
                                    label="Book Now"
                                    className="w-8"
                                />
                                <Button
                                    icon="pi pi-users"
                                    label="Login"
                                    className="w-8"
                                    onClick={() => {
                                        // router.push("/auth/login");
                                        localStorage.setItem(
                                            "USER",
                                            JSON.stringify(fakedata),
                                        );
                                        router.reload();
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="flex gap-8 w-24rem justify-content-end ">
                                <div className="card p-2 right-0 ">
                                    <div
                                        onClick={(event) => {
                                            (profileMenu.current as any).toggle(
                                                event,
                                            );
                                        }}
                                        className="  p-link flex align-items-center h-4 p-0"
                                    >
                                        <Avatar
                                            image={
                                                user?.avatarUrl !== null
                                                    ? user?.avatarUrl
                                                    : "https://t3.ftcdn.net/jpg/05/00/54/28/360_F_500542898_LpYSy4RGAi95aDim3TLtSgCNUxNlOlcM.jpg"
                                            }
                                            className="mr-2"
                                            shape="circle"
                                        />
                                        <div className="flex flex-column align">
                                            <span className="font-bold">
                                                Amy Elsner
                                            </span>
                                            <span className="text-sm">
                                                Agent
                                            </span>
                                        </div>
                                    </div>
                                    <Menu
                                        ref={profileMenu}
                                        popup
                                        model={profileOption as any}
                                        id="profilePopup"
                                        className="mt-3 mr-2"
                                    />
                                </div>{" "}
                            </div>
                        )}
                    </div>
                </nav>
            </div>

            <div className="container-fluid p-0 mb-5 pb-5">
                <Carousel
                    arrows={false}
                    responsive={{
                        desktop: {
                            breakpoint: { max: 3000, min: 0 },
                            items: 1,
                        },
                    }}
                >
                    <div
                        className="carousel-item position-relative active"
                        style={{ minHeight: "100vh" }}
                    >
                        <img
                            className="position-absolute w-100 h-100"
                            src="/demo/images/templates/carousel-1.jpg"
                            style={{ objectFit: "cover" }}
                        ></img>
                        <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                            <div className="p-3" style={{ maxWidth: "900px" }}>
                                <h6
                                    className="text-white text-uppercase mb-3 animate__animated animate__fadeInDown"
                                    style={{ letterSpacing: "3px" }}
                                >
                                    Natural Spa
                                </h6>
                                <h3 className="display-3 text-capitalize text-white mb-3">
                                    Xoa Bóp Và Trị Liệu
                                </h3>
                                <p className="mx-md-5 px-5">
                                    Thư giãn sâu bên trong
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="carousel-item position-relative active"
                        style={{ minHeight: "100vh" }}
                    >
                        <img
                            className="position-absolute w-100 h-100"
                            src="/demo/images/templates/service-5.jpg"
                            style={{ objectFit: "cover" }}
                        ></img>
                        <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                            <div className="p-3" style={{ maxWidth: "900px" }}>
                                <h6
                                    className="text-white text-uppercase mb-3 animate__animated animate__fadeInDown"
                                    style={{ letterSpacing: "3px" }}
                                >
                                    NATURAL SPA
                                </h6>
                                <h3 className="display-3 text-capitalize text-white mb-3">
                                    Jacuuzi @ Natural Spa
                                </h3>
                                <p className="mx-md-5 px-5">
                                    Một giải pháp mang đến niềm hạnh phúc
                                </p>
                                <a
                                    className="btn btn-outline-light py-3 px-4 mt-3 animate__animated animate__fadeInUp"
                                    href="#"
                                >
                                    Make Appointment
                                </a>
                            </div>
                        </div>
                    </div>
                    <div
                        className="carousel-item position-relative active"
                        style={{ minHeight: "100vh" }}
                    >
                        <img
                            className="position-absolute w-100 h-100"
                            src="/demo/images/templates/carousel-3.jpg"
                            style={{ objectFit: "cover" }}
                        ></img>
                        <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                            <div className="p-3" style={{ maxWidth: "900px" }}>
                                <h6
                                    className="text-white text-uppercase mb-3 animate__animated animate__fadeInDown"
                                    style={{ letterSpacing: "3px" }}
                                >
                                    NATURAL SPA
                                </h6>
                                <h3 className="display-3 text-capitalize text-white mb-3">
                                    Chăm sóc làng da và sắc đẹp
                                </h3>
                                <p className="mx-md-5 px-5">
                                    Hòa mình với thiên nhiên và sự hành phúc
                                </p>
                                <a
                                    className="btn btn-outline-light py-3 px-4 mt-3 animate__animated animate__fadeInUp"
                                    href="#"
                                >
                                    Make Appointment
                                </a>
                            </div>
                        </div>
                    </div>
                </Carousel>
            </div>

            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="row">
                        <div
                            className="col-lg-6"
                            style={{ minHeight: "100px" }}
                        >
                            <div className="position-relative h-100">
                                <img
                                    className="position-absolute w-100 h-100"
                                    src="/demo/images/templates/opening.jpg"
                                    style={{ objectFit: "cover" }}
                                ></img>
                            </div>
                        </div>
                        <div className="col-lg-6 pt-5 pb-lg-5">
                            <div className="hours-text bg-light p-4 p-lg-5 my-lg-5">
                                <h6 className="d-inline-block text-white text-uppercase primary-bg py-1 px-2">
                                    Natural Spa
                                </h6>
                                <h1 className="mb-4">
                                    Trẻ hóa cơ thể và tâm hồn của bạn
                                </h1>
                                <p>
                                    Tại Natural Spa, chúng tôi áp dụng phương
                                    pháp tiếp cận toàn diện để trị liệu cho
                                    Khách hàng của mình. Chúng ta biết rằng con
                                    người không ai giống ai hoàn toàn ngay cả
                                    khi có những diểm tương đồng. Cơ thể, tâm
                                    trí và linh hồn của bạn đều được kết nối với
                                    nhau và cơ thể nếu bị tổn thương tâm trí và
                                    tinh thần cũng sẽ phản ứng và ngược lại.
                                </p>
                                <ul className="list-inline">
                                    <li className="h6 py-1">
                                        <i className="far fa-circle primary-text mr-3"></i>
                                        T2 – T7 : 9:00 - 18:00
                                    </li>

                                    <li className="h6 py-1">
                                        <i className="far fa-circle primary-text mr-3"></i>
                                        CN : Đóng Cửa
                                    </li>
                                </ul>
                                <a href="" className="btn btn-primary mt-2">
                                    Đặt lịch
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-lg-6 pb-5 pb-lg-0">
                            <img
                                className="img-fluid w-100"
                                src="/demo/images/templates/about.jpg"
                                alt=""
                            ></img>
                        </div>
                        <div className="col-lg-6">
                            <h6 className="d-inline-block primary-text text-uppercase bg-light py-1 px-2">
                                About Us
                            </h6>
                            <h1 className="mb-4">
                                CƠ SỞ CHĂM SÓC SẮC ĐẸP VÀ NUÔI DƯỠNG LÀN DA TỐT
                                NHẤT
                            </h1>
                            <p className="pl-4 border-left border-primary">
                                Natural Spa là nơi bạn đến để thư giản trong bầu
                                không khí ngập tràn sự quan tâm và tin tưởng. Ẩn
                                mình trong thiên nhiên, với bầu không khí trong
                                lành đang tiếp thêm sinh lực. Natural Spa là sự
                                lựa chọn cần thiết của bạn để nạp năng lượng và
                                chữa lành tâm hồn
                            </p>
                            <div className="row pt-3">
                                <div className="col-6">
                                    <div className="bg-light text-center p-4">
                                        <h3
                                            className="display-4 primary-text"
                                            data-toggle="counter-up"
                                        >
                                            99
                                        </h3>
                                        <h6 className="text-uppercase">
                                            Chuyên gia sắc đẹp
                                        </h6>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="bg-light text-center p-4">
                                        <h3
                                            className="display-4 primary-text"
                                            data-toggle="counter-up"
                                        >
                                            999
                                        </h3>
                                        <h6 className="text-uppercase">
                                            Khách hàng hài lòng
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid">
                <div className="col-12 text-center bg-orange-400 ">
                    <h2 className="text-white mt-2">SPA, NAIL AND HAIRCAIR</h2>
                </div>
                <Card className="md:col-6 col-12 h-25rem relative flex ">
                    <div className="card-center relative  ">
                        <h2 className="title">Điều Trị</h2>
                        <div className="service-title w-full relative h-1"></div>
                        <p className="card-content">
                            Khám điều trị, chăm sóc da và body tại Natural Spa
                        </p>
                        <h1>Xem thêm</h1>
                    </div>
                </Card>
                <div className="md:col-6 col-12 h-25rem relative">
                    <Carousel
                        infinite={true}
                        arrows={true}
                        responsive={{
                            desktop: {
                                breakpoint: { max: 3000, min: 0 },
                                items: 1,
                            },
                        }}
                        className="h-full relative"
                    >
                        {serviceCarousel.map((image, index) => (
                            <div
                                key={index}
                                className="carousel-item relative active w-full"
                            >
                                <img
                                    src={image.src}
                                    alt=""
                                    className="w-full image-round h-25rem img-fluid abolute"
                                    style={{ objectFit: "cover" }}
                                ></img>
                            </div>
                        ))}
                    </Carousel>
                </div>
                <Card className="md:col-6 col-12 h-25rem relative flex md:flex-order-2">
                    <div className="card-center relative ">
                        <h2 className="title">NAIL SALON</h2>
                        <div className="service-title w-full relative h-1"></div>
                        <p className="card-content">
                            Dịch vụ Nail chuyên nghiệp tại Natural Spa
                        </p>
                        <h1>Xem thêm</h1>
                    </div>
                </Card>
                <div className="md:col-6 col-12 h-25rem md:flex-order-1">
                    <Carousel
                        infinite={true}
                        arrows={true}
                        responsive={{
                            desktop: {
                                breakpoint: { max: 3000, min: 0 },
                                items: 1,
                            },
                        }}
                        className="h-full relative"
                    >
                        {serviceCarousel.map((image, index) => (
                            <div
                                key={index}
                                className="carousel-item relative active w-full"
                            >
                                <img
                                    src={image.src}
                                    alt=""
                                    className="w-full h-25rem image-round img-fluid abolute"
                                    style={{ objectFit: "cover" }}
                                ></img>
                            </div>
                        ))}
                    </Carousel>
                </div>
                <Card className="md:col-6 col-12 h-25rem relative flex md:flex-order-3 ">
                    <div className="card-center relative  ">
                        <h2 className="title">HAIR SALON</h2>
                        <div className="service-title w-full relative h-1 "></div>
                        <p className="card-content">
                            Dịch vụ chăm sóc tóc chuyên nghiệp tại Natural Spa
                        </p>
                        <h1>Xem thêm</h1>
                    </div>
                </Card>
                <div className="md:col-6 col-12 h-25rem md:flex-order-4 mb-5 ">
                    <Carousel
                        infinite={true}
                        arrows={true}
                        responsive={{
                            desktop: {
                                breakpoint: { max: 3000, min: 0 },
                                items: 1,
                            },
                        }}
                        className="h-full relative"
                    >
                        {serviceCarousel.map((image, index) => (
                            <div
                                key={index}
                                className="carousel-item relative active w-full"
                            >
                                <img
                                    src={image.src}
                                    alt=""
                                    className="w-full h-25rem image-round img-fluid abolute"
                                    style={{ objectFit: "cover" }}
                                ></img>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
            <div className="container-fluid px-0 py-5 my-5">
                <div className="row mx-0 justify-content-center text-center">
                    <div className="col-lg-6">
                        <h6 className="d-inline-block bg-light primary-text text-uppercase py-1 px-2">
                            Dịch vụ phẩu thuật thẩm mỹ
                        </h6>
                        <h1>Natural Spa Plastic Surgery Service</h1>
                    </div>
                </div>
                <Carousel
                    arrows={false}
                    responsive={{
                        desktop: {
                            breakpoint: { max: 3000, min: 1024 },
                            items: 5,
                        },
                        tablet: {
                            breakpoint: { max: 1024, min: 464 },
                            items: 3,
                        },
                        mobile: {
                            breakpoint: { max: 464, min: 0 },
                            items: 2,
                        },
                    }}
                    infinite={true}
                    className="mb-5 "
                >
                    <div className="service-item position-relative relative ">
                        <img
                            className="w-full"
                            height={"500em"}
                            width={"600px"}
                            src="/demo/images/templates/service-1.jpg"
                            alt=""
                        ></img>
                        <div className="service-text text-center">
                            <h4 className="text-white font-weight-medium px-3">
                                Mặt
                            </h4>
                            <p className="text-white px-3 mb-3">
                                Elitr labore sit dolor erat est lorem diam sea
                                ipsum diam dolor duo sit ipsum
                            </p>
                            <div className="w-100 bg-white text-center p-4">
                                <a className="btn btn-primary" href="">
                                    Make Appointment
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="service-item position-relative relative  ">
                        <img
                            className="w-full"
                            height={"500em"}
                            width={"600px"}
                            src="https://www.matsaigon.com/wp-content/uploads/benh-o-mi-mat.jpeg"
                            alt=""
                        ></img>
                        <div className="service-text text-center">
                            <h4 className="text-white font-weight-medium px-3">
                                Mắt
                            </h4>
                            <p className="text-white px-3 mb-3">
                                Elitr labore sit dolor erat est lorem diam sea
                                ipsum diam dolor duo sit ipsum
                            </p>
                            <div className="w-100 bg-white text-center p-4">
                                <a className="btn btn-primary" href="">
                                    Make Appointment
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="service-item position-relative ">
                        <img
                            className="w-full"
                            height={"500em"}
                            width={"600px"}
                            src="https://benhvienngocphu.com/static/upload/images/Mui-Ben-Dep.jpeg"
                            alt=""
                        ></img>
                        <div className="service-text text-center">
                            <h4 className="text-white font-weight-medium px-3">
                                Mũi
                            </h4>
                            <p className="text-white px-3 mb-3">
                                Elitr labore sit dolor erat est lorem diam sea
                                ipsum diam dolor duo sit ipsum
                            </p>
                            <div className="w-100 bg-white text-center p-4">
                                <a className="btn btn-primary" href="">
                                    Make Appointment
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="service-item position-relative   ">
                        <img
                            className="w-full"
                            height={"500em"}
                            width={"600px"}
                            src="https://thammyviengangwhoo.vn/wp-content/uploads/2021/03/don-cam-co-duoc-vinh-vien-khong-1.jpg"
                            alt=""
                        ></img>
                        <div className="service-text text-center">
                            <h4 className="text-white font-weight-medium px-3">
                                Cằm
                            </h4>
                            <p className="text-white px-3 mb-3">
                                Elitr labore sit dolor erat est lorem diam sea
                                ipsum diam dolor duo sit ipsum
                            </p>
                            <div className="w-100 bg-white text-center p-4">
                                <a className="btn btn-primary" href="">
                                    Make Appointment
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="service-item position-relative  ">
                        <img
                            className="w-full"
                            height={"500em"}
                            width={"600px"}
                            src="https://nhakhoatandinh.com/wp-content/uploads/2020/03/lam-trang-rang-nha-khoa.jpg"
                            alt=""
                        ></img>
                        <div className="service-text text-center">
                            <h4 className="text-white font-weight-medium px-3">
                                Nha khoa
                            </h4>
                            <p className="text-white px-3 mb-3">
                                Elitr labore sit dolor erat est lorem diam sea
                                ipsum diam dolor duo sit ipsum
                            </p>
                            <div className="w-100 bg-white text-center p-4">
                                <a className="btn btn-primary" href="">
                                    Make Appointment
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="service-item position-relative  ">
                        <img
                            className="w-full"
                            height={"500em"}
                            width={"600px"}
                            src="/demo/images/templates/service-4.jpg"
                            alt=""
                        ></img>
                        <div className="service-text text-center">
                            <h4 className="text-white font-weight-medium px-3">
                                Body
                            </h4>
                            <p className="text-white px-3 mb-3">
                                Elitr labore sit dolor erat est lorem diam sea
                                ipsum diam dolor duo sit ipsum
                            </p>
                            <div className="w-100 bg-white text-center p-4">
                                <a className="btn btn-primary" href="">
                                    Make Appointment
                                </a>
                            </div>
                        </div>
                    </div>
                </Carousel>
            </div>
            <div className="contact">
                <h1 className="contact-title">Liên hệ với chúng tôi</h1>
                <div className=" contact-body  mt-7">
                    <div className="info">
                        <div className="info-card">
                            <h4 className="info-title">
                                <span></span>Da Nang
                            </h4>
                            <p className="info-detail">
                                <i className="pi pi-directions mr-3  icon-size" />
                                Địa chỉ
                            </p>
                            <p className="info-detail">
                                <i className="pi pi-google mr-3  icon-size" />
                                Email
                            </p>
                            <p className="info-detail">
                                <i className="pi pi-tablet mr-3  icon-size" />
                                Điện thoại
                            </p>
                            <p className="info-detail">
                                <i className="pi pi-clock mr-3  icon-size" />
                                Thứ 2 - Thứ 7 : 9:00 - 18:00
                            </p>
                        </div>
                    </div>
                    <div className="contact-form">
                        <div className="mt-3">
                            <h5>
                                Họ và tên
                                <span className="text-orange-700">*</span>:
                            </h5>
                            <InputText
                                value={contact?.customerName}
                                onChange={(e) => {
                                    console.log(e);
                                }}
                                style={{ width: "100%" }}
                                placeholder="Tên của bạn"
                            />
                        </div>
                        <div className="lg:flex gap-7 justify-content-between lg:w-full  ">
                            <div className="mt-3 w-full lg:w-6">
                                <h5>
                                    Số điện thoại
                                    <span className="text-orange-700">*</span>:
                                </h5>
                                <InputText
                                    value={contact?.phoneNumber}
                                    onChange={(e) => {
                                        console.log(e);
                                    }}
                                    style={{ width: "100%" }}
                                    placeholder="Nhập SĐT của bạn"
                                />
                            </div>
                            <div className="mt-3 w-full lg:w-6">
                                <h5>
                                    Email
                                    <span className="text-orange-700">*</span>:
                                </h5>
                                <InputText
                                    value={contact?.email}
                                    onChange={(e) => {
                                        console.log(e);
                                    }}
                                    style={{ width: "100%" }}
                                    placeholder="Nhập email của bạn"
                                />
                            </div>
                        </div>
                        <div className="mt-3">
                            <h5>
                                Dịch vụ
                                <span className="text-orange-700">*</span>:
                            </h5>
                            <InputText
                                value={contact?.name}
                                onChange={(e) => {
                                    console.log(e);
                                }}
                                style={{ width: "100%" }}
                            />
                        </div>
                        <div className="mt-3">
                            <h5>
                                Câu hỏi
                                <span className="text-orange-700">*</span>:
                            </h5>
                            <InputTextarea
                                value={contact?.question}
                                autoResize
                                rows={6}
                                onChange={(e) => {
                                    console.log(e);
                                }}
                                style={{ width: "100%" }}
                            />
                        </div>
                        <div className="text-center">
                            <Button
                                label="Gửi"
                                severity="success"
                                className="w-3 mt-4 "
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer container-fluid position-relative bg-dark py-5">
                <div className="container pt-5">
                    <div className="row">
                        <div className="col-lg-6 pr-lg-5 mb-5">
                            <a href="index.html" className="navbar-brand">
                                <h1 className="mb-3 text-white">
                                    <span className="primary-text">
                                        Natural
                                    </span>{" "}
                                    Spa
                                </h1>
                            </a>
                            <p>
                                Natural Spa là nơi bạn đến để thư giãn trong bầu
                                không khí ngập tràn sự quan tâm và tin tưởng. Ẩn
                                mình trong thiên nhiên với không khí trong lành
                                tiếp thêm sinh lực.
                            </p>
                            <p>
                                Natural Spa là sự lựa chọn cần thiết của bạn để
                                nạp năng lượng và chữa lành tâm hồn.
                            </p>
                            <p>
                                <i className="fa fa-map-marker-alt mr-2"></i>123
                                Da Nang, Viet Nam
                            </p>
                            <p>
                                <i className="fa fa-phone-alt mr-2"></i>+84 345
                                67890
                            </p>
                            <p>
                                <i className="fa fa-envelope mr-2"></i>
                                info@example.com
                            </p>
                            <div className="d-flex justify-content-start mt-4">
                                <a
                                    className="btn btn-lg btn-primary btn-lg-square mr-2"
                                    href="#"
                                >
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a
                                    className="btn btn-lg btn-primary btn-lg-square mr-2"
                                    href="#"
                                >
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a
                                    className="btn btn-lg btn-primary btn-lg-square mr-2"
                                    href="#"
                                >
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                                <a
                                    className="btn btn-lg btn-primary btn-lg-square"
                                    href="#"
                                >
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-6 pl-lg-5">
                            <div className="row">
                                <div className="col-sm-6 mb-5">
                                    <h5 className="text-white text-uppercase mb-4">
                                        Quick Links
                                    </h5>
                                    <div className="d-flex flex-column justify-content-start">
                                        <a
                                            className="text-white-50 mb-2"
                                            href="#"
                                        >
                                            <i className="fa fa-angle-right mr-2"></i>
                                            Home
                                        </a>
                                        <a
                                            className="text-white-50 mb-2"
                                            href="#"
                                        >
                                            <i className="fa fa-angle-right mr-2"></i>
                                            About Us
                                        </a>
                                        <a
                                            className="text-white-50 mb-2"
                                            href="#"
                                        >
                                            <i className="fa fa-angle-right mr-2"></i>
                                            Our Services
                                        </a>
                                        <a
                                            className="text-white-50 mb-2"
                                            href="#"
                                        >
                                            <i className="fa fa-angle-right mr-2"></i>
                                            Pricing Plan
                                        </a>
                                        <a className="text-white-50" href="#">
                                            <i className="fa fa-angle-right mr-2"></i>
                                            Contact Us
                                        </a>
                                    </div>
                                </div>
                                <div className="col-sm-6 mb-5">
                                    <h5 className="text-white text-uppercase mb-4">
                                        Our Services
                                    </h5>
                                    <div className="d-flex flex-column justify-content-start">
                                        <a
                                            className="text-white-50 mb-2"
                                            href="#"
                                        >
                                            <i className="fa fa-angle-right mr-2"></i>
                                            Body Massage
                                        </a>
                                        <a
                                            className="text-white-50 mb-2"
                                            href="#"
                                        >
                                            <i className="fa fa-angle-right mr-2"></i>
                                            Stone Therapy
                                        </a>
                                        <a
                                            className="text-white-50 mb-2"
                                            href="#"
                                        >
                                            <i className="fa fa-angle-right mr-2"></i>
                                            Facial Therapy
                                        </a>
                                        <a
                                            className="text-white-50 mb-2"
                                            href="#"
                                        >
                                            <i className="fa fa-angle-right mr-2"></i>
                                            Skin Care
                                        </a>
                                        <a className="text-white-50" href="#">
                                            <i className="fa fa-angle-right mr-2"></i>
                                            Nail Care
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <a href="#" className="btn btn-lg btn-primary back-to-top">
                <i className="fa fa-angle-double-up"></i>
            </a>
        </>
    );
};

LandingPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};

export default LandingPage;
