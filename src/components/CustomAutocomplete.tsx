import { Autocomplete, TextField, CircularProgress, Box, ClickAwayListener, InputAdornment } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDebouncedSearch } from '../hooks/useDebouncedSearch';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { useLazyGetProductsQuery } from '../redux/services/productApi';
import useHotkey from '../hooks/useHotKey';

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

    
    // hot key custom hook 
    useHotkey({ ctrlKey: true, key: "k" }, () => setOpen(true));



    // debounced custom hook
    const debouncedSearch = useDebouncedSearch((query) => {
        setSearchTerm(query);
        setSkip(0);
        setProducts([]);
    }, 500);

    // infinite scroll custom hook 
    const handleScroll = useInfiniteScroll(() => setSkip((prev) => prev + 10), isFetching, hasMore);


    return (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
            <div>
                <Autocomplete
                    sx={{ width: 400 }}
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    options={products}
                    getOptionLabel={(option) => option.title}
                    filterOptions={(x) => x} // for not apply client search
                    onInputChange={(_, newValue) => debouncedSearch(newValue)}
                    renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                            {option.title}
                        </li>
                    )}
                    loading={isFetching}
                    slotProps={{ listbox: { onScroll: handleScroll } }}
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
                                    startAdornment: (
                                        <InputAdornment position="end" sx={{ ml: "auto" }}>
                                            <Box
                                                sx={{
                                                    bgcolor: "#f0f0f0",
                                                    px: 1,
                                                    py: 0.5,
                                                    borderRadius: 1,
                                                    fontSize: "0.75rem",
                                                    fontWeight: "bold",
                                                    color: "#555",
                                                }}
                                            >
                                                Ctrl + K
                                            </Box>
                                        </InputAdornment>
                                    ),
                                }
                            }}
                        />
                    )}
                />
            </div>
        </ClickAwayListener>
    )
}

export default CustomAutocomplete