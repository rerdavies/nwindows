/*
 *   Copyright (c) 2024-2025 Robin E. R. Davies
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */




import React from 'react';

import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

interface SearchBoxProps {
    onSearchChanged?: (text: string) => void;
    onSearchChangedWithDelay?: (text: string) => void;
    onApplySearch?: (text: string) => boolean;
    onOpen?: (open: boolean) => void;
    initialText?: string;
    alwaysOpen?: boolean;
}
interface SearchBoxState {
    open: boolean;
    searchText: string;
}

export class SearchBox extends React.Component<SearchBoxProps, SearchBoxState> {
    constructor(props: SearchBoxProps) {
        super(props);
        this.state = {
            open: props.alwaysOpen ?? false,
            searchText: this.props.initialText ?? "",
        };

    }

    handleSearchClicked(open: boolean) {
        if (this.props.alwaysOpen) {
            return;
        }
        if (open) {
            this.setState({ open: open, searchText: "" });
            if (this.inputRef) {
                this.inputRef.disabled = false;
                this.inputRef.focus();
            }
            if (this.props.onOpen) {
                this.props.onOpen(true);
            }
        }
        else {
            this.setState({ open: false });
            if (this.inputRef) {
                this.inputRef.disabled = true;
                this.inputRef.blur();
            }
            this.props.onSearchChangedWithDelay?.("");
            if (this.props.onOpen) {
                this.props.onOpen(false);
            }
        }
    }
    private searchTimerHandle: number | undefined;
    cancelSearchTimer() {
        if (this.searchTimerHandle) {
            clearTimeout(this.searchTimerHandle);
            this.searchTimerHandle = undefined;
        }
    }

    componentDidMount(): void {
        if (this.state.open || this.props.alwaysOpen) {
            if (this.inputRef) {
                this.inputRef.focus();                
            }
        }
    }
    componentDidUpdate(prevProps: Readonly<SearchBoxProps>, prevState: Readonly<SearchBoxState>, snapshot?: any): void {
        prevState as any;
        snapshot as any;
        
        if (prevProps.initialText !== this.props.initialText) {
            this.setState({ searchText: this.props.initialText ?? "" });
        }
    }
    componentWillUnmount(): void {
        this.cancelSearchTimer();
    }
    startSearchTimer() {
        this.cancelSearchTimer();
        this.searchTimerHandle = setTimeout(() => {
            this.searchTimerHandle = undefined;
            this.props.onSearchChangedWithDelay?.(this.state.searchText);
        }, 500);
    }
    handleTextChanged(text: string) {
        if (this.props.onSearchChanged) {
            this.props.onSearchChanged(text);
        }
        if (text === "" && this.state.searchText !== "") {
            // clear immediately.
            this.cancelSearchTimer();
            this.props.onSearchChangedWithDelay?.("");
        } else {
            this.startSearchTimer();
        }
    }
    private inputRef: HTMLInputElement | undefined;

    render() {
        let alwaysOpen = this.props.alwaysOpen ?? false;
        return (
            <div className="search_box"   style={{ border: alwaysOpen ? "1px solid #888" : undefined }}

            >
                <IconButton onClick={() => this.handleSearchClicked(!this.state.open)}
                >
                    <SearchIcon />
                </IconButton>
                <div className={
                        alwaysOpen ? "search_box_always_open" : 
                            ((this.state.open  ) ? "search_box_open" : "search_box_closed")
                    }
                >
                    <TextField id="standard-basic"
                        inputRef={(input) => {
                            this.inputRef = input as HTMLInputElement;
                            if (this.inputRef) {
                                if (this.state.open || alwaysOpen) {
                                    this.inputRef.disabled = false;
                                } else {
                                    this.inputRef.disabled = true;
                                    this.inputRef.blur();
                                }
                            }
                        }}
                        hiddenLabel margin="none" fullWidth variant="standard" style={{ flexGrow: 1, borderBottomWidth: 0 }}
                        placeholder="Search..."
                        value={this.state.searchText}
                        onBlur={() => {
                            if (this.state.searchText.length === 0) {
                                this.handleSearchClicked(false);
                            }

                        }}
                        onChange={(e) => {
                            let value = e.target.value;
                            this.setState({ searchText: value });
                            this.handleTextChanged(e.target.value);

                        }}
                        onKeyDown={
                            (e) => {
                                if (e.key === "Escape") {
                                    this.handleSearchClicked(false);
                                    e.preventDefault();
                                } else if (e.key == "Enter") {
                                    if (this.state.searchText.length === 0) {
                                        this.handleSearchClicked(false);
                                        e.preventDefault();
                                    } else {
                                        if (this.searchTimerHandle) {
                                            clearTimeout(this.searchTimerHandle);
                                            this.props.onSearchChangedWithDelay?.(this.state.searchText);
                                        }
                                        if (this.props.onApplySearch) {
                                            if (this.props.onApplySearch(this.state.searchText)) {
                                                this.handleSearchClicked(false);
                                            }
                                        }
                                        e.preventDefault();
                                    }
                                }
                            }}
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">
                                    <IconButton onClick={() => {
                                        if (this.state.searchText.length > 0) {

                                            this.setState({ searchText: "" });
                                            this.handleTextChanged("");
                                        } else {
                                            this.handleSearchClicked(false);
                                        }


                                    }}>
                                        <CloseIcon
                                        />
                                    </IconButton>
                                </InputAdornment>,
                            },
                        }}

                    />
                </div>
            </div>
        );
    }
}


export default SearchBox;