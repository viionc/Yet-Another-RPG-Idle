function TownPanel() {
    return (
        <section className="border rounded-md col-span-2 p-2 border-slate-800 bg-neutral-800 col-start-2 row-start-1 row-span-3">
            <h1 className="mb-2 text-xl">town name</h1>
            <article className="w-1/2 flex flex-col gap-2">
                <button className="border rounded-md hover:bg-yellow-500 hover:text-black px-1 py-2">Tavern</button>
                <button className="border rounded-md hover:bg-yellow-500 hover:text-black px-1 py-2">Shop</button>
                <button className="border rounded-md hover:bg-yellow-500 hover:text-black px-1 py-2">Exploration Guild</button>
            </article>
        </section>
    );
}

export default TownPanel;
