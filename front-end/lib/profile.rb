# encoding: UTF-8
# frozen-string-literal: true
#
# =================================
# The Curriculum Vitae of Cẩm Huỳnh
# =================================

DeveloperRepository.find_by_name("Cẩm Huỳnh").inspect

{
  profile: {
    name: "Cẩm Huỳnh",
    handle: @hqcam,
    title: "Software Engineer",
    gender: :male,
    contact: {
      email: [
        "huynhquancam at Gmail"
      ],
      website: "https://hqc.io"
    }
  },
  education: {
    degree: "Bachelor of Engineering in Computer Science",
    university: "Industrial University of Ho Chi Minh City (IUH)"
  },
  experience: [
    {
      company: "FootballAddicts",
      website: "http://footballaddicts.com",
      title: "Back-end Developer",
      from: "Sep 2016",
      to: :present
    },
    {
      company: "Dadadee",
      website: "https://dadadee.com",
      title: "Back-end Engineer",
      from: "May 2015",
      to: "March 2016"
    },
    {
      company: "ITViec",
      website: "https://itviec.com",
      title: "Ruby Developer",
      from: "Jan 2015",
      to: "May 2015"
    },
    {
      company: "FutureWorkz",
      website: "http://futureworkz.com",
      title: "Software Engineer",
      from: "July 2012",
      to: "Dec 2014"
    }
  ],
  projects: [
    {
      name: "worque",
      url: "https://github.com/qcam/worque",
      tags: [:worque, :cli],
      technologies: [:Ruby, :Git]
    },
    {
      name: "vim-worque",
      url: "https://github.com/qcam/vim-worque",
      tags: [:worque, :cli, :productivity],
      technologies: [:VimL]
    },
    {
      name: "bootstrap_validator_rails",
      url: "https://github.com/qcam/bootstrap_validator_rails",
      tags: [:validator, :bootstrap, :rails],
      technologies: [:Rubygems, :Bootstrap3, :Rails]
    },
    {
      name: "docebo_ruby",
      description: "Ruby wrapper for Docebo API",
      url: "https://github.com/qcam/docebo_ruby",
      tags: [:api, :docebo],
      technologies: [:RestClient, :Ruby, :RubyGems]
    },
    {
      name: "chat_stack",
      description: "Chat stack = RESTFul API + WebSocket",
      url: "https://github.com/qcam/chat-stack",
      tags: [:chat, :restful],
      technologies: [:WebSocket, :Ruby, :Node]
    }
  ]
}

# Thanks for viewing!
# Source code can be found on Github at https://github.com/qcam/rbcv.
# Copyright 2016 by @hqcam
