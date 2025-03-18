import { Autocomplete, TextField, CircularProgress, Box, InputAdornment, Chip } from '@mui/material';
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
    const [selectedProducts, setSelectedProducts] = useState<{ id: number; title: string }[]>([]); // ✅ Multi-Select State

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
    }, 500);

    // infinite scroll custom hook 
    const handleScroll = useInfiniteScroll(() => setSkip((prev) => prev + 10), isFetching, hasMore);


    return (
             <div>
                <Autocomplete
                    multiple
                    freeSolo
                    sx={{ width: 500 }}
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    options={products}
                    getOptionLabel={(option) => typeof option === "string" ? option : option.title} // ✅ Handle both string & object
                    filterOptions={(x) => x} // Disable default filtering
                    onInputChange={(_, newValue) => debouncedSearch(newValue)}
                    value={selectedProducts} // ✅ Ensure it always gets an array of objects
                    onChange={(_, newValue) => {
                        // ✅ Convert string inputs into objects
                        const updatedValue = newValue.map((item) =>
                            typeof item === "string" ? { id: Date.now(), title: item } : item
                        );
                        setSelectedProducts(updatedValue);
                    }}
                    renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                            {option.title}
                        </li>
                    )}
                    loading={isFetching}
                    slotProps={{ listbox: { onScroll: handleScroll } }}
                    renderTags={(selected, getTagProps) =>
                        selected.map((option, index) => (
                            <Chip
                                {...getTagProps({ index })}
                                key={option.id}
                                label={option.title}
                                onDelete={() =>
                                    setSelectedProducts(selected.filter((item) => item.id !== option.id))
                                }
                            />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Select Products"
                            variant="outlined"
                            slotProps={{
                                input: {
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {isFetching ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                            <InputAdornment position="end" sx={{ ml: "auto" }}>
                                                <Box
                                                    sx={{
                                                        bgcolor: "#f0f0f0",
                                                        px: .5,
                                                        py: 0.1,
                                                        borderRadius: 1,
                                                        fontSize: "8px",
                                                        color: "#555",
                                                    }}
                                                >
                                                    Ctrl + K
                                                </Box>
                                            </InputAdornment>
                                        </>
                                    ),

                                }
                            }}
                        />
                    )}
                />
            </div>
     );
};

export default CustomAutocomplete;
