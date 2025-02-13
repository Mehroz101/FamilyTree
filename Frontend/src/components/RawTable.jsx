import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";

export default function RowExpansionDemo() {
    const [products, setProducts] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const [innerExpandedRows, setInnerExpandedRows] = useState({});
    const toast = useRef(null);

    useEffect(() => {
        // Simulating fetching data
        setProducts(mockData);
    }, []);

    const onRowExpand = (event) => {
        toast.current.show({
            severity: "info",
            summary: "Product Expanded",
            detail: event.data.name,
            life: 3000,
        });
    };

    const onRowCollapse = (event) => {
        toast.current.show({
            severity: "success",
            summary: "Product Collapsed",
            detail: event.data.name,
            life: 3000,
        });
    };

    const expandAll = () => {
        let _expandedRows = {};
        products.forEach((p) => (_expandedRows[`${p.id}`] = true));
        setExpandedRows(_expandedRows);
    };

    const collapseAll = () => {
        setExpandedRows(null);
    };

    const formatCurrency = (value) => {
        return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
    };

    const amountBodyTemplate = (rowData) => {
        return formatCurrency(rowData.amount);
    };

    const statusOrderBodyTemplate = (rowData) => {
        return <Tag value={rowData.status.toLowerCase()} severity={getOrderSeverity(rowData)}></Tag>;
    };

    const imageBodyTemplate = (rowData) => {
        return (
            <img
                src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`}
                alt={rowData.image}
                width="64px"
                className="shadow-4"
            />
        );
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.inventoryStatus} severity={getProductSeverity(rowData)}></Tag>;
    };

    const getProductSeverity = (product) => {
        switch (product.inventoryStatus) {
            case "INSTOCK":
                return "success";
            case "LOWSTOCK":
                return "warning";
            case "OUTOFSTOCK":
                return "danger";
            default:
                return null;
        }
    };

    const getOrderSeverity = (order) => {
        switch (order.status) {
            case "DELIVERED":
                return "success";
            case "CANCELLED":
                return "danger";
            case "PENDING":
                return "warning";
            case "RETURNED":
                return "info";
            default:
                return null;
        }
    };

    const allowExpansion = (rowData) => {
        return rowData.orders.length > 0;
    };

    // **Inner row expansion logic**
    const onInnerRowToggle = (event, parentId) => {
        setInnerExpandedRows((prev) => ({
            ...prev,
            [parentId]: event.data,
        }));
    };

    const innerRowExpansionTemplate = (order, parentId) => {
        return (
            <div className="p-3">
                <h6>Order ID: {order.id} - {order.customer}</h6>
                {order.items && order.items.length > 0 ? (
                    <DataTable
                        value={order.items}
                        expandedRows={innerExpandedRows[parentId] || null}
                        onRowToggle={(e) => onInnerRowToggle(e, parentId)}
                        dataKey="id"
                    >
                        <Column field="id" header="Item ID" />
                        <Column field="name" header="Item Name" />
                        <Column field="price" header="Price" body={priceBodyTemplate} />
                        <Column field="quantity" header="Quantity" />
                    </DataTable>
                ) : (
                    <p>No items available</p>
                )}
            </div>
        );
    };

    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3">
                <h5>Orders for {data.name}</h5>
                <DataTable value={data.orders}>
                    <Column field="id" header="Order ID" />
                    <Column field="customer" header="Customer" />
                    <Column field="date" header="Date" />
                    <Column field="amount" header="Amount" body={amountBodyTemplate} />
                    <Column field="status" header="Status" body={statusOrderBodyTemplate} />
                    <Column expander={(rowData) => rowData.items?.length > 0} body={(rowData) => innerRowExpansionTemplate(rowData, data.id)} />
                </DataTable>
            </div>
        );
    };

    const header = (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text />
            <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} text />
        </div>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <DataTable
                value={products}
                expandedRows={expandedRows}
                onRowToggle={(e) => setExpandedRows(e.data)}
                onRowExpand={onRowExpand}
                onRowCollapse={onRowCollapse}
                rowExpansionTemplate={rowExpansionTemplate}
                dataKey="id"
                header={header}
                tableStyle={{ minWidth: "60rem" }}
            >
                <Column expander={allowExpansion} style={{ width: "5rem" }} />
                <Column field="name" header="Name" sortable />
                <Column header="Image" body={imageBodyTemplate} />
                <Column field="price" header="Price" sortable body={priceBodyTemplate} />
                <Column field="category" header="Category" sortable />
                <Column field="rating" header="Reviews" sortable body={ratingBodyTemplate} />
                <Column field="inventoryStatus" header="Status" sortable body={statusBodyTemplate} />
            </DataTable>
        </div>
    );
}

// **Mock Data**
const mockData = [
    {
        id: "1",
        name: "Product A",
        image: "bamboo-watch.jpg",
        price: 299,
        category: "Watches",
        rating: 4,
        inventoryStatus: "INSTOCK",
        orders: [
            {
                id: "101",
                customer: "John Doe",
                date: "2024-02-12",
                amount: 150,
                status: "DELIVERED",
                items: [
                    { id: "1a", name: "Strap", price: 20, quantity: 2 },
                    { id: "1b", name: "Battery", price: 10, quantity: 1 },
                ],
            },
        ],
    },
];
