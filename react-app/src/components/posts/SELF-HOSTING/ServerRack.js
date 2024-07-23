import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../../contexts/DarkModeContext';
import '../../../styles/post.css';
import ServerRackImage from '../../../assets/images/server_rack_cables.jpeg';
import ServerRackMess from '../../../assets/images/server_rack_mess.jpeg';
import CollapsibleSection from '../../CollapsibleSection';
import BlogPostIndentedParagraph from "../../BlogPostIndentedParagraph";

function ServerRack() {
    const { isDarkMode } = useContext(DarkModeContext);

    return (

        <article className={isDarkMode ? 'post dark-mode' : 'post'}>

            <img className="post-image" src={ServerRackImage} alt="ServerRack" />

            <CollapsibleSection title="Next-Gen Engineers and the Cloud (~1min)">
                <BlogPostIndentedParagraph>
                    In today's world, we're all hooked into Cloud-oriented Infrastructure and Cloud-hosted Apps.
                    The Cloud is a new paradigm that is groundbreaking and every Engineer should be involved in growing their
                    skills in a Cloud-native environment.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    However, this has also abstracted some of the foundational knowledge that some Engineers should have.
                    New generations of Engineers are building straight into the Cloud and skipping the Hardware hustle.
                    I was a victim of this Cloud side-effect. In fact, generally speaking, dealing with Infrastructure is the
                    last thing Developers want to worry about. So, using most of the Managed services offered by Cloud Providers
                    (e.g. AWS EKS, Fargate, Lightsail, etc...) feels awesome and saves you a lot of time, but, this is until you
                    see that monthly charge on your Credit Card.
                </BlogPostIndentedParagraph>
            </CollapsibleSection>

            <CollapsibleSection title="Cost (~3min)">

                <BlogPostIndentedParagraph>
                    Have you ever been hit with a Cloud Provider unexpectedly humongous bill? I have,
                    and it sure hurts <span span role="img" aria-label="head hurt">🤕</span>. Most Public Cloud Providers
                    offer "free tier" resources for a promotional period, and that's awesome if you're getting started into the Cloud world, or if you
                    just wanna test things out. But, what if you need something more permanent? You could want a small website,
                    or API, or HomeLab, to always be running. Then, guess what's going to happen after the trial or free-tier period?
                    Yeah...that first bill is going to hit you like truck.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Certainly, you can setup some automation and alerts to prevent you from going over
                    your set budget and limit. But, let's face it, when you have that adrenaline rush to get your idea up and running, money and alerts
                    are probably not on the top of your list. You'll probably tell yourself that you'll do it later...
                    I've been there, and I ended up calling AWS Support asking for a courtesy first-time
                    reduction on my bill (it was in the $$$ ranges...). Luckily, they were willing to help me (this was years ago, not sure
                    if they still do this, so, don't risk it), and I just walked away with slap on my wrist.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Ok, ok, but what does this have to do with Racks and Servers? Well, what if
                    instead of paying AWS, you invest in a server? You can get a Server from many places for well under $200.
                    Now, you might asking yourself if $200 is a better deal than just paying AWS... and if you don't
                    take into account your time to setup and maintain your server(s), using your own server(s) will certainly be cheaper.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Some folks will tell you that electricity could offset the self-hosting benefits,
                    and this might hold true depending on where you live. But, if electricity is not a heavy factor, self-hosting
                    is much cheaper. Once again, I'll give the example of AWS (and don't get me wrong, I love AWS, I use it everyday at
                    work). Imagine you set up an EC2 instance, with a VPC, couple of Subnets, some logs in CloudWatch, an
                    S3 bucket to store data, maybe a DynamoDB or RDS backend, maybe SSM to be able to create
                    a session into Server (btw, please don't do this, there are better and free tools out there,
                    checkout this blog post <Link to="/post/server-ssh">How to connect securely to your Servers - Teleport</Link>).
                    Well guess what, almost every Service has a fee that you will hit in one way or another.
                    These fees could come be in terms of API calls, amount of Data transferred, or usage, or all of them
                    <span span role="img" aria-label="goofy face">🤪</span>.
                </BlogPostIndentedParagraph>


                <BlogPostIndentedParagraph>
                    The bottom line is that you can do all of this in your own server and not incur a cost for any
                    of that. Big Corporations can afford to pay millions in Cloud Services, but it makes sense to them because otherwise they would need to
                    hire personnel to do all of the abstractions (i.e. packages that need constant patching, cabling, configuration, and backup under the hood to provide the Cloud service,
                    but users don't need to worry about it), which requires specialized skill and expensive salaries; not to mention that because they are
                    running a business, they get to deduct many of these expenses in their Tax reports.
                    For regular users the only cost will be the time invested in configuring, and maintaining all those abstractions
                    themselves on their own server, which will take me to the next reason
                    as to why you should self-host: the learning experience.
                </BlogPostIndentedParagraph>

            </CollapsibleSection>

            <CollapsibleSection title="Learning Experience (~1.5min)">
                <BlogPostIndentedParagraph>
                    So, almost every new Engineer out there is following tutorials for
                    Cloud certifications, or other purposes, and they are just eager to stand up vanilla Infrastructure.
                    This often leads to Public Networks, open ports, and other security holes in your implementation.
                    If you're an experienced Network or Security professional, that's fine. But, if you're just starting
                    in your Cloud journey you want to start by doing it the right way.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    When you're self-hosting you have to hook up everything yourself. This means
                    you're gonna be responsible for connecting your servers to the correct switch, to the correct modem/router, etc, etc.
                    My point here being that you have to be aware of all the devices involved in routing traffic inbound, and outbound
                    of your local Network, and more importantly, making sure you're not exposing anything to the internet from
                    your local.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    This all sounds great, but you might sitting there and thinking: why exactly do I care?
                    Well, do you know what things like DHCP do? Or how IPs work (internal, public, IP classes)?
                    Is your home properly protected? Are you sure you don't have any services
                    running on unknown ports? Are you sure there isn't unknown traffic hitting your local network?
                    These are all things you will surely want to iron out before exposing <strong>your</strong>
                    Server(s) somehow to the internet.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Will all this knowledge serve me in the Cloud? Sure as hell it will.
                    The Cloud is no different that your own local. The only difference is that it's managed by someone
                    else. This means everything your learn self-hosting is portable to the Cloud. Actually, I think
                    you come even more prepared from self-hosting than starting in the Cloud, because you know
                    everything that's involved at a more granular level with no abstractions.
                </BlogPostIndentedParagraph>

            </CollapsibleSection>

            <CollapsibleSection title="Conclusion (~1min)">
                <BlogPostIndentedParagraph>
                    Get a HomeLab going, get something running in Server(s) that <strong>you</strong> maintain.
                    And I say Server(s), but I truly mean anything capable of hosting any type of application. For example,
                    a RaspberryPy is also another way of self-hosting for even cheaper if you don't want to spend too much,
                    and don't need a lot of hardware to keep things running.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    It doesn't have to be perfect, you can iterate on the imperfections and improve as you go along.
                    Let me show you the Server rack I setup (where you're currently seeing this page rendered from). It has a
                    few things attached, like a NAS, a Unifi Dream Machine, a RaspberryPy, a Switch, and 2 Servers:
                </BlogPostIndentedParagraph>

                <img className="post-image" src={ServerRackMess} alt="ServerRackMess" />

                <BlogPostIndentedParagraph>
                    As you can tell, it's definitely not good-looking, and every Server Rack <em>aficionado</em> is probably
                    having a heart attack seeing this.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    But, trust me, going through this experience is worth it, and probably something cool you can talk about
                    with your coworkers or friends (those <em>"OMG! You're a hacker!"</em> from
                    non-tech folks are also priceless <span role="img" aria-label="smiling face with sunglasses emoji">😎</span>).
                </BlogPostIndentedParagraph>

            </CollapsibleSection>

        </article>
    );
}

export default ServerRack;