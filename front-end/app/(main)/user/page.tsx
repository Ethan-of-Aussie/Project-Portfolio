"use client";

export default function user () {
    const getDisplayText = async () => {
        const data = await fetch("http://127.0.0.1:5000/api/v1/users/").then((res) => res.json())
        alert(data)
    }
    return (
        <div>
            <h1>User</h1>
            <button className="bg-red-500" onClick={
                getDisplayText
            }>get api</button>
        </div>
    )
}