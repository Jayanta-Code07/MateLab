



import * as React from 'react'
import Button from '@mui/material/Button'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import { useRef, useState, useEffect } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import "../HomeStyle/SidebarItem.css"

export default function SidebarItem({ content }) {
    const id = React.useId()
    const buttonId = `${id}-button`
    const menuId = `${id}-menu`
    const [open, setOpen] = useState(false)
    const [hovered, setHovered] = useState(false);
    const anchorRef = useRef(null);
    const closeTimer = useRef(null);

    const clearCloseTimer = () => {
        if (closeTimer.current !== undefined) {
            clearTimeout(closeTimer.current)
            closeTimer.current = undefined
        }
    }

    const handleOpen = () => {
        clearCloseTimer()
        setOpen(true)
        setHovered(true)
    }

    const handleCloseSoon = () => {
        clearCloseTimer()
        closeTimer.current = setTimeout(() => {
            setOpen(false)
        }, 120)
        setHovered(false)
    }

    const handleClose = () => {
        clearCloseTimer()
        setOpen(false)
    }

    const handleToggle = () => {
        clearCloseTimer()
        setOpen((prev) => !prev)
    }

    useEffect(() => () => clearCloseTimer(), [])

    return (
        <div>
            <ListItem disablePadding className="SidebarItem">
                <ListItemButton className="SidebarItemButton"
                    ref={anchorRef}
                    id={buttonId}
                    aria-controls={open ? menuId : undefined}
                    aria-haspopup="true"
                    aria-expanded={open}
                    onClick={handleToggle}
                    onMouseEnter={handleOpen}
                    onMouseLeave={handleCloseSoon}
                >

                    <ListItemIcon className="SidebarItemIcon">
                        <img
                            src={hovered ? content.icon : content.staticIcon}
                            alt={content.Name}
                            className="ItemIcon"
                        />
                    </ListItemIcon>

                    <ListItemText
                        primary={content.Name}
                        className="SidebarItemText"
                    />

                </ListItemButton>
            </ListItem>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="right-start"
                transition
                sx={{ zIndex: 1 }}
            >
                {({ TransitionProps }) => (
                    <Grow {...TransitionProps} style={{ transformOrigin: 'left top' }}>
                        <Paper
                            onMouseEnter={handleOpen}
                            onMouseLeave={handleCloseSoon}
                            elevation={8}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id={menuId}
                                    aria-labelledby={buttonId}
                                >
                                    {
                                        content.menues.map((menu, index) => (
                                            <MenuItem onClick={handleClose} key={index} style={{
                                                margin: "0 7px 0 15px",
                                                padding: "10px 30px 10px 30px",
                                                borderRadius: "10px"
                                            }} >
                                                <ListItemIcon>
                                                    <img src={menu.icon} alt={menu.Name}
                                                        style={{
                                                            width: 24,
                                                            height: 24,
                                                            objectFit: "contain"
                                                        }} />
                                                </ListItemIcon>

                                                {menu.Name}

                                            </MenuItem>
                                        ))
                                    }
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div >
    )
}