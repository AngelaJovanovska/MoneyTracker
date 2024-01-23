import { Button } from "@mui/material";
import React from "react";

type Props = {};

const EditButton = (props: Props) => {
    return (
        <Button variant="contained" className="edit-btn">
            Edit
        </Button>
    );
};

export default EditButton;
