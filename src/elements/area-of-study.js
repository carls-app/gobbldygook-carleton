import React, {Component, PropTypes} from 'react'

import Requirement from './requirement'

// import './area.scss'

export default class AreaOfStudy extends Component {
    static propTypes = {
        _progress: PropTypes.shape({
            at: PropTypes.number.isRequired,
            of: PropTypes.number.isRequired,
            word: PropTypes.string.isRequired,
        }),
        name: PropTypes.string.isRequired,
        result: PropTypes.object.isRequired,
        revision: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    }

    static defaultProps = {
        _progress: {
            word: 'zero',
            at: 0,
            of: 1,
        },
        name: 'Unknown Area',
        type: '???',
        revision: '0000-00',
        result: {},
    }

    render() {
        return (
            <details className='area'>
                <summary className='summary'>
                    <h1 className='area--title'>{this.props.name}</h1>
                    <progress
                        className={`area--progress ${this.props._progress.word}`}
                        value={this.props._progress.at}
                        max={this.props._progress.of} />
                </summary>
                <Requirement {...this.props} topLevel />
            </details>
        )
    }
}
