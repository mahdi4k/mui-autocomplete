import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDebouncedSearch } from '../hooks/useDebouncedSearch';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { useLazyGetProductsQuery } from '../redux/services/productApi';

const CustomAutocomplete = () => {

    const [products, setProducts] = useState<{ id: number; title: string }[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [skip, setSkip] = useState(0);

    // get lazy product data
    const [fetchProducts, { data, isFetching }] = useLazyGetProductsQuery();

    // fetch data on open or search product
    useEffect(() => {
        if (open) {
            fetchProducts({ limit: "10", skip: skip.toString(), q: searchTerm });
        }
    }, [fetchProducts, open, skip, searchTerm]);

    //set product & check for has more product
    useEffect(() => {
        if (data) {
            setProducts((prev) => (skip === 0 ? data.products : [...prev, ...data.products]));
            setHasMore(products.length + data.products.length < data.total);
        }
    }, [data]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Check if the user pressed 'Ctrl + K'
            if (event.ctrlKey && event.key === "k") {
                event.preventDefault(); // Prevent default browser behavior (open search bar)
                setOpen(true); // Open Autocomplete on 'Ctrl + K'
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);


    // debounced custom hook
    const debouncedSearch = useDebouncedSearch((query) => {
        setSearchTerm(query);
        setSkip(0);
        setProducts([]);
    }, 500);

    // infinite scroll custom hook 
    const handleScroll = useInfiniteScroll(() => setSkip((prev) => prev + 10), isFetching, hasMore);


    return (
        <div>
            <Autocomplete
                sx={{ width: 400 }}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                options={products}
                getOptionLabel={(option) => option.title}
                filterOptions={(x) => x} //for disable client side filtering
                onInputChange={(_, newValue) => debouncedSearch(newValue)}
                renderOption={(props, option) => {
                    return (
                        <li {...props} key={option.id}> {/* ✅ Unique key set here */}
                            {option.title}
                        </li>
                    );
                }}

                loading={isFetching}
                slotProps={
                    { listbox: { onScroll: handleScroll } }
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Select Product"
                        variant="outlined"
                        slotProps={{
                            input: {
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {isFetching ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }
                        }}
                    />
                )}
            />
        </div>
    )
}

export default CustomAutocomplete