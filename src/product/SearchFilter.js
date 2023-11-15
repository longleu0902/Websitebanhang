import { useState } from "react"
import { Navigate, useNavigate } from 'react-router-dom';
const SearchFilter = ({ keywords, List }) => {
    const searchFilter = List.filter((product) => product.title.toLowerCase().includes(keywords))
    const navigate = useNavigate();
    const handleRedirectPage = (idProduct, type = 'product') => {
        navigate(`/${type}/${idProduct}`);
    }
    return (
        <>
            {keywords == '' ? '' : (
                <div>
                    {searchFilter.map((product) => (
                        <>
                            <div onClick={() => handleRedirectPage(product.id)} className="search-filter-item">
                                <img style={{ maxWidth: 100 }} src={product.img} />
                                <span style={{ width: '100%', margin: '12px 12px' }}>{product.title}</span>
                            </div>
                            <hr style={{ borderStyle: "dashed ", margin: '6px 0px' }}></hr>
                        </>
                    ))}
                </div>

            )}
        </>
    )
}
export default SearchFilter;