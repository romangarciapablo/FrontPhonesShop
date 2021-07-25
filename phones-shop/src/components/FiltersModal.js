import { React, useEffect, useState } from 'react';

const FiltersModal = (props) => {
    console.log(props);
    const [newFilters, setNewFilters] = useState(props.filter);

    return (
        <div className="modal fade" id="filtersModal" tabindex="-1" role="dialog" aria-labelledby="filtersModal" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="filtersModal">Filters</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                    Esta funcionalidad no ha sido terminada

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>);
}

export default FiltersModal;
