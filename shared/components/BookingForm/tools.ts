export const mapService = (serviceList: any) => {
    const data: number[] = [];
    serviceList?.map((e: any) => {
        data.push(e.id);
    });
    return data;
};
