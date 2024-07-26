import express from 'express'
const route = express()
import ProjectController from '../../adapters/ProjectsController'
import ProjectUseCase from '../../use_case/ProjectUseCase'
import projectRepository from '../repository/projectRepository'
import projectLeadAuth from '../middlewares/ProjectLeadAuth'


const projectrepo = new projectRepository()
const projectusecase = new ProjectUseCase(projectrepo)
const projectcontroller = new ProjectController(
    projectusecase
)


//projects//
route.post('/', projectLeadAuth, (req, res, next) => projectcontroller.createProject(req, res, next))
route.get('/', projectLeadAuth, (req, res, next) => projectcontroller.getProjects(req, res, next))
route.delete('/:projectId', projectLeadAuth, (req, res, next) => projectcontroller.deleteProject(req, res, next))
route.put('/:projectId', projectLeadAuth, (req, res, next) => projectcontroller.editProject(req, res, next))







export default route