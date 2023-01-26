import React from 'react';
import Document, { DocumentContext, } from 'next/document';
// @ts-ignore
import bundleCss from '!raw-loader!../styles/tailwindSSR.css';

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {

        try {
            const initialProps = await Document.getInitialProps(ctx);

            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        <style key="custom" dangerouslySetInnerHTML={{ __html: bundleCss }} />
                    </>
                ),
            };
        } finally {

        }
    }
}