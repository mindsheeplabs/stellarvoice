import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTABanner from '../components/CTABanner';
import { getPost, getRelatedPosts } from '../data/blogPosts';
import './BlogPost.css';

// Render one section of a blog post. The structured-data approach
// keeps the page consistent and lets us add new section types easily.
function Section({ section }) {
    switch (section.type) {
        case 'p':
            return <p>{section.text}</p>;
        case 'h2':
            return <h2 className="bp-h2">{section.text}</h2>;
        case 'pullquote':
            return (
                <blockquote className="bp-pullquote">
                    <p>{section.text}</p>
                </blockquote>
            );
        case 'visual':
            return (
                <figure className="bp-visual">
                    {section.image ? (
                        // <picture> swaps to a portrait mobile variant when one
                        // exists (section.mobileImage), else serves the desktop
                        // image at all sizes.
                        <picture>
                            {section.mobileImage && (
                                <source media="(max-width: 640px)" srcSet={section.mobileImage} />
                            )}
                            <img
                                src={section.image}
                                alt={section.imageAlt ?? section.label ?? ''}
                                className="bp-visual-img"
                                loading="lazy"
                            />
                        </picture>
                    ) : (
                        <div className="bp-visual-frame" aria-hidden="true">
                            <span className="bp-visual-marker">Visual</span>
                            <p className="bp-visual-title">{section.label}</p>
                            <p className="bp-visual-caption">{section.description}</p>
                        </div>
                    )}
                </figure>
            );
        case 'statStrip':
            // With an image, serve the wide desktop band and swap to a portrait
            // mobile variant under 640px via <picture>. With no image at all,
            // fall back to native CSS stat cards (still crisp at any size).
            if (section.image) {
                return (
                    <figure className="bp-visual bp-stat-figure">
                        <picture>
                            {section.mobileImage && (
                                <source media="(max-width: 640px)" srcSet={section.mobileImage} />
                            )}
                            <img
                                src={section.image}
                                alt={section.imageAlt ?? section.items.map((i) => `${i.value} ${i.label}`).join('. ')}
                                className="bp-visual-img"
                                loading="lazy"
                            />
                        </picture>
                    </figure>
                );
            }
            return (
                <div className="bp-stat-strip">
                    {section.items.map((item, i) => (
                        <div key={i} className="bp-stat-card">
                            <p className="bp-stat-value">{item.value}</p>
                            <p className="bp-stat-label">{item.label}</p>
                        </div>
                    ))}
                </div>
            );
        case 'table':
            return (
                <div className="bp-table-wrap">
                    <table className="bp-table">
                        <thead>
                            <tr>
                                {section.headers.map((h, i) => (
                                    <th key={i}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {section.rows.map((row, ri) => (
                                <tr key={ri}>
                                    {row.map((cell, ci) => (
                                        <td key={ci}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        case 'takeaway':
            return (
                <aside className="bp-takeaway">
                    <p className="bp-takeaway-label">The one thing to remember</p>
                    <p>{section.text}</p>
                </aside>
            );
        case 'ctaInline':
            return (
                <div className="bp-cta-inline">
                    <Link to="/#quiz" className="bp-cta-inline-link">
                        {section.text} &rarr;
                    </Link>
                </div>
            );
        default:
            return null;
    }
}

const fmtDate = (iso) => {
    try {
        return new Date(iso).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
        return iso;
    }
};

export default function BlogPost() {
    const { slug } = useParams();
    const post = getPost(slug);

    useEffect(() => {
        if (!post) return;
        const prevTitle = document.title;
        document.title = `${post.title} | Stellar Voice Agents`;
        return () => { document.title = prevTitle; };
    }, [post]);

    if (!post) {
        return (
            <>
                <Navbar />
                <main className="bp-page">
                    <section className="bp-hero">
                        <div className="container bp-hero-inner">
                            <h1>Post not found</h1>
                            <p>The post you are looking for does not exist or has moved.</p>
                            <Link to="/blog" className="btn-primary">Browse all posts</Link>
                        </div>
                    </section>
                </main>
                <Footer />
            </>
        );
    }

    const related = getRelatedPosts(slug, 3);

    return (
        <>
            <Navbar />
            <main className="bp-page">
                {/* HERO BAND */}
                <section className="bp-hero">
                    <div className="container bp-hero-inner">
                        <div className="bp-hero-tags">
                            <span className="bp-tag bp-tag-category">{post.category}</span>
                            <span className="bp-tag bp-tag-vertical">{post.vertical}</span>
                        </div>
                        <h1>{post.title}</h1>
                        <p className="bp-hero-dek">{post.dek}</p>
                        <div className="bp-hero-meta">
                            <div className="bp-hero-meta-author">
                                <strong>{post.author}</strong>
                                <span>{post.authorRole}</span>
                            </div>
                            <span className="bp-hero-meta-divider" aria-hidden="true">·</span>
                            <span>{fmtDate(post.date)}</span>
                            <span className="bp-hero-meta-divider" aria-hidden="true">·</span>
                            <span>{post.readTime} read</span>
                        </div>
                    </div>
                </section>

                {/* HERO VISUAL — real image if available, placeholder otherwise. */}
                {(post.heroImage || post.heroVisual) && (
                    <section className="bp-hero-visual-wrap">
                        <div className="container">
                            <figure className="bp-hero-visual">
                                {post.heroImage ? (
                                    <picture>
                                        {post.heroMobileImage && (
                                            <source media="(max-width: 640px)" srcSet={post.heroMobileImage} />
                                        )}
                                        <img
                                            src={post.heroImage}
                                            alt={post.heroImageAlt ?? post.heroVisual?.label ?? ''}
                                            className="bp-hero-img"
                                        />
                                    </picture>
                                ) : (
                                    <div className="bp-hero-visual-frame" aria-hidden="true">
                                        <span className="bp-visual-marker">Hero visual</span>
                                        <p className="bp-visual-title">{post.heroVisual.label}</p>
                                        <p className="bp-visual-caption">{post.heroVisual.description}</p>
                                    </div>
                                )}
                            </figure>
                        </div>
                    </section>
                )}

                {/* BODY */}
                <article className="bp-body">
                    <div className="container bp-body-inner">
                        {post.sections.map((section, i) => (
                            <Section key={i} section={section} />
                        ))}
                    </div>
                </article>

                {/* RELATED POSTS */}
                {related.length > 0 && (
                    <section className="bp-related">
                        <div className="container">
                            <h2 className="bp-related-title">Keep reading</h2>
                            <div className="bp-related-grid">
                                {related.map((rp, i) => (
                                    <Link key={i} to={`/blog/${rp.slug}`} className="bp-related-card">
                                        <span className="bp-tag bp-tag-category">{rp.category}</span>
                                        <h3>{rp.title}</h3>
                                        <p className="bp-related-dek">{rp.dek}</p>
                                        <p className="bp-related-meta">
                                            <strong>{rp.author}</strong> · {rp.readTime}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* SOURCES */}
                {post.sources?.length > 0 && (
                    <section className="bp-sources">
                        <div className="container bp-sources-inner">
                            <details>
                                <summary>Sources &amp; references ({post.sources.length})</summary>
                                <ul>
                                    {post.sources.map((src, i) => (
                                        <li key={i}>{src}</li>
                                    ))}
                                </ul>
                            </details>
                        </div>
                    </section>
                )}

                <CTABanner />
            </main>
            <Footer />
        </>
    );
}
