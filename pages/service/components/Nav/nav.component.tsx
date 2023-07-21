interface NavigationProps {
    linkPage: string[];
}

function Navigation(props: NavigationProps) {
    let router = "http://localhost:3000";

    return (
        <nav className="mb-4">
            <ul className="p-0 flex flex-row align-items-center gap-2 m-0 text">
                <li className="list-none flex align-items-center">
                    <a href={router} style={{ color: "#495057" }}>
                        <i className="pi pi-fw pi-home text-base"></i>
                    </a>
                </li>

                {props.linkPage.map((value: string, i: number) => {
                    router = router + "/" + value;
                    return (
                        <li
                            key={value + "_" + i}
                            className="flex flex-row gap-2 align-items-center"
                        >
                            <span>/</span>
                            <a style={{ color: "#495057" }} href={router}>
                                {value}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default Navigation;
