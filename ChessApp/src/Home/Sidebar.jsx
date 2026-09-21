

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import BrandName from '../BrandName/BrandName'
import "../HomeStyle/Sidebar.css"
import BrandIcon from "../assets/HomeAssets/knightBrandIcon.svg"
import PlayIcon from "../assets/HomeAssets/play-white-sidebar.gif"
import PlayIconStatic from "../assets/HomeAssets/play-white-sidebar.png"
import PuzzelIcon from "../assets/HomeAssets/puzzelIcon.gif"
import PuzzelIconStatic from "../assets/HomeAssets/puzzelIcon.png"
import LearnIcon from "../assets/HomeAssets/learnIcon.gif"
import LearnIconStatic from "../assets/HomeAssets/learnIcon.png"
import TrainIcon from "../assets/HomeAssets/trainIcon.gif"
import TrainIconStatic from "../assets/HomeAssets/trainIcon.png"
import CommunityIcon from "../assets/HomeAssets/communityIcon.gif"
import CommunityIconStatic from "../assets/HomeAssets/communityIcon.png"
import MoreIcon from "../assets/HomeAssets/moreIcon.gif"
import MoreIconStatic from "../assets/HomeAssets/moreIcon.png"
import HelpIcon from "../assets/HomeAssets/helpIcon.gif"
import HelpIconStatic from "../assets/HomeAssets/helpIcon.png"
import PlayOnlineIcon from "../assets/HomeAssets/Play_Online.png";
import BotIcon from "../assets/HomeAssets/bot.png"
import CoachIcon from "../assets/HomeAssets/coach.png"
import StatIcon from "../assets/HomeAssets/statistics.png"
import TournamentIcon from "../assets/HomeAssets/tournament.png"
import HistoryIcon from "../assets/HomeAssets/history.png"
import SidebarItem from './SidebarItem'
import SignUpButtonMan from './SignUpButton'
import LogginButton from './LogginButton'

const drawerWidth = 200

export default function Sidebar() {

    const BrandContent = [
        {
            icon: BrandIcon,
            Name: "MateLab",
        }
    ]

    const SideBarContants = [
        {
            icon: PlayIcon,
            staticIcon: PlayIconStatic,
            Name: "Play",
            menues: [
                {
                    Name: "Play Online",
                    icon: PlayOnlineIcon
                },
                {
                    Name: "Play with Bot",
                    icon: BotIcon
                },
                {
                    Name: "Play Coach",
                    icon: CoachIcon
                },
                {
                    Name: "Stats",
                    icon: StatIcon
                },
                {
                    Name: "Tournaments",
                    icon: TournamentIcon
                },
                {
                    Name: "History",
                    icon: HistoryIcon
                }
            ]
        },
        {
            icon: PuzzelIcon,
            staticIcon: PuzzelIconStatic,
            Name: "Puzzel",
            menues: [
                {
                    Name: "Play Online",
                    icon: PlayIconStatic
                },
                {
                    Name: "Play Bot",
                    icon: PlayIconStatic
                },
                {
                    Name: "Play Coach",
                    icon: PlayIconStatic
                }
            ]
        },
        {
            icon: LearnIcon,
            staticIcon: LearnIconStatic,
            Name: "Learn",
            menues: [
                {
                    Name: "Play Online",
                    icon: PlayIconStatic
                },
                {
                    Name: "Play Bot",
                    icon: PlayIconStatic
                },
                {
                    Name: "Play Coach",
                    icon: PlayIconStatic
                }
            ]
        },
        {
            icon: TrainIcon,
            staticIcon: TrainIconStatic,
            Name: "Train",
            menues: [
                {
                    Name: "Play Online",
                    icon: PlayIconStatic
                },
                {
                    Name: "Play Bot",
                    icon: PlayIconStatic
                },
                {
                    Name: "Play Coach",
                    icon: PlayIconStatic
                }
            ]
        },
        {
            icon: CommunityIcon,
            staticIcon: CommunityIconStatic,
            Name: "Community",
            menues: [
                {
                    Name: "Play Online",
                    icon: PlayIconStatic
                },
                {
                    Name: "Play Bot",
                    icon: PlayIconStatic
                },
                {
                    Name: "Play Coach",
                    icon: PlayIconStatic
                }
            ]
        },
        {
            icon: MoreIcon,
            staticIcon: MoreIconStatic,
            Name: "More",
            menues: [
                {
                    Name: "Play Online",
                    icon: PlayIconStatic
                },
                {
                    Name: "Play Bot",
                    icon: PlayIconStatic
                },
                {
                    Name: "Play Coach",
                    icon: PlayIconStatic
                }
            ]
        },
    ]

    const HelpContent = {
        icon: HelpIcon,
        staticIcon: HelpIconStatic,
        Name: "help & support",
        menues: [
            {
                Name: "Play Online",
                icon: PlayIconStatic
            },
            {
                Name: "Play Bot",
                icon: PlayIconStatic
            },
            {
                Name: "Play Coach",
                icon: PlayIconStatic
            }
        ]
    }

    const drawer = (
        <Box role="navigation" sx={{
            width: drawerWidth,
            display: "flex",
            flexDirection: "column",
            height: "100vh"
        }}>
            <List>
                {BrandContent.map((content, index) => (
                    <BrandName key={index} content={content} />
                ))}
            </List>
            <List>
                {
                    SideBarContants.map((content, index) => (
                        <SidebarItem key={index} content={content} />
                    ))
                }
            </List>
            <Box sx={{ mt: "auto" }} >
                <SignUpButtonMan />
                <LogginButton />
                <List>
                    {
                        <SidebarItem content={HelpContent} />
                    }
                </List>
            </Box>
        </Box>
    )

    return (
        <Drawer
            slotProps={{
                paper: {
                    className: "animate__animated animate__fadeInLeft"
                }
            }}
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,

                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: "#242421",
                    scrollbarWidth: "none",
                },
            }}
            open
        >
            {drawer}
        </Drawer>
    )
}
