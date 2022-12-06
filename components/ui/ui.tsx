import React, { DOMElement, ReactElement } from 'react'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faXmark } from '@fortawesome/free-solid-svg-icons'


interface OptionItemProps {
    text: String,
    icon: any,
    rank: String | null
}


class OptionItem extends React.Component<OptionItemProps>{

    static defaultProps = {
        text: "Empty Text",
        icon: faXmark,
        rank: "mid"
    }

    constructor(props: any) {
        super(props)
        console.log(this.props)
    }




    render() {

        return (
            <li className={`w-full  h-fit rounded-lg  ${this.props.rank == 'bottom' && "bg-white"} `}>
                <a className={`flex flex-row h-full w-full p-4 gap-4`}>
                    <div>
                        <FontAwesomeIcon icon={this.props.icon} />
                    </div>
                    <div>
                        {this.props.text}
                    </div>

                </a>
            </li>
        )
    }
}



interface OptionListProps {
    list: Array<{ text: String, icon: any }> | undefined,
    rank?: "mid" | "bottom" | "top"

}

class OptionList extends React.Component<OptionListProps>{

    defaultProps = {
        rank: "mid"
    }

    constructor(props: OptionListProps) {
        super(props)
    }

    render() {
        return (
            <>
                <ul className={`flex flex-col ${this.props.rank == 'bottom' && 'gap-6'} ${this.props.rank == 'mid' && 'gap-1'}`}>
                    {this.props.list != undefined &&
                        this.props.list.map((option, index) => {
                            return <OptionItem key={index} rank={this.props.rank} text={option.text} icon={option.icon} />
                        })
                    }
                </ul>
            </>
        )
    }
}


// interface CardProps{
//     title: String,

// }

const Tag = (props: any) => {


    return (
        <div className={`bg-[#EEEEEE] text-[#545454] rounded px-2 py-1`}>
            <span>{props.children}</span>
        </div>
    )
}


interface TagDisplayProps {
    list: Array<String>
}

class TagDispay extends React.Component<TagDisplayProps>{

    defaultProps = {
        list: []
    }

    containerRef: React.RefObject<any> = React.createRef();

    state: {
        extraTags: number,
        tagLimit: number,
        visibleTags: Array<String>
    }

    constructor(props: any) {

        super(props)



        this.state = {
            extraTags: 0,
            tagLimit: 4,
            visibleTags: []
        }

        if (this.props.list.length <= this.state.tagLimit) {
            this.state.visibleTags = this.props.list;
        } else if (this.props.list.length > this.state.tagLimit) {
            this.state.visibleTags = this.props.list.slice(0, this.state.tagLimit - 1); //the tag at the limit is not displayed
            this.state.extraTags = this.props.list.length - 2
        }



    }

    componentDidMount(): void {
        console.log("caller function say container ref")
        console.log(this.containerRef.current.scrollWidth)
        console.log("caller function width")
        console.log(this.containerRef.current.offsetWidth)
    }

    render() {
        return (
            <div ref={this.containerRef} className={`flex flex-row gap-2 py-2`}>
                {this.state.visibleTags.map((tagContent, index) => {
                    return <Tag key={index}>{tagContent}</Tag>
                })}
                {this.state.extraTags != 0 && <Tag>+{this.state.extraTags} More</Tag>
                }
            </div>
        )
    }
}

interface TagEditorProps {
    tagList: Array<String>
}

class TagEditor extends React.Component<TagEditorProps>{

    defaultProps = {
        tagList: [
            "intelligent",
            "hardWorker",
            "kind",
            "eternal learner"
        ]
    }

    constructor(props: any) {
        super(props)

    }

    render(): React.ReactNode {
        return (
            <div className={``}>
                <TagDispay list={this.props.tagList} />
            </div>
        )
    }
}


class NoteCard extends React.Component {

    fakeTagList: Array<String> = [
        "finance",
        "tech",
        "software",
        "investment"
    ]

    constructor(props: any) {
        super(props)

    }


    render() {
        return (
            <div className={`bg-[#FBFBFB] p-4 rounded-lg`}>
                <div>
                    <div className={`px-0 text-sm font-normal text-[#8F8F8F]`}>
                        {/* date goes there */}
                        04 APRIL
                    </div>
                </div>
                <div>
                    <p className={`py-1 px-0 font-medium text-lg text-[#353535]`}>Exploring some stuff</p>
                </div>
                <div>
                    <p className={`py-2 text-base text-[#676767]`}>
                        The world is a pretty strange place. People do die for other's...
                    </p>
                </div>
                <div>
                    <TagDispay list={this.fakeTagList} />
                </div>
            </div>
        )
    }
}


export { OptionList, NoteCard, TagEditor}

export type { OptionListProps, OptionItemProps, TagEditorProps}