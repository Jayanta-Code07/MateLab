

import "./BrandName.css";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function BrandName({ content }) {
    return (
        <ListItem  disablePadding>
            <ListItemButton className="brand-button">

                <ListItemIcon className="brand-icon-wrapper">
                    <img
                        src={content.icon}
                        alt="MateLab"
                        className="brand-icon"
                    />
                </ListItemIcon>

                <ListItemText
                    primary={content.Name}
                    className="brand-text"
                />

            </ListItemButton>
        </ListItem>
    );
}